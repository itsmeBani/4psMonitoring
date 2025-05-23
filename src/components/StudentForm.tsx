import {z} from "zod";
import {useForm} from "react-hook-form";
import {NewStudentSchema} from "../Schema/FormSchemas.ts";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog.tsx";
import {Button} from "./ui/button.tsx";

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "./ui/form.tsx";
import {Input} from "./ui/input.tsx";

import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "./ui/select.tsx";
import EducationalStatus from "./EducationalStatus.tsx";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {Loader2, XIcon} from "lucide-react";
import supabase from "../supabase-config/supabase.tsx";
import {toast} from "sonner";
import React, {useState} from "react";
import {StudentData} from "../interfaces/StudentInterface.ts";
interface StudentFormProps {
    openStudentModal:boolean
    HandleOpenStudentModal:(ParentID?:string )=>void
    ParentID?:string
    reload:()=>void
    modalType:"INSERT" | "VIEW" | "UPDATE" | undefined
    EditData?:StudentData | undefined

}

function StudentForm({openStudentModal,HandleOpenStudentModal,ParentID,reload,modalType,EditData} :StudentFormProps) {

    const defaultValues = {
        firstname: "",
        lastname: "",
        middlename: "",
        birthdate: "",
        LRN:"",
        status:"",
        gradelevel:"",
        schoolname: "",
        schooladdress: "",
        schoolID: "",
        schooltype: "",
        schoollevel: "",
        schoolyearstart:"",
        schoolyearend:""
    }
    const [loading,setLoading]=useState<boolean>(false)
    const form = useForm < z.infer < typeof NewStudentSchema >> ({
        resolver: zodResolver(NewStudentSchema),
        defaultValues: defaultValues,
    })
    React.useEffect(() => {
        if (EditData) {
            form.reset({...EditData, birthdate: new Date(EditData?.birthdate).toISOString().split("T")[0]});
        }
    }, [EditData]);
    const inputDisabledWhenViewing=modalType === "VIEW"
    async function onSubmit(values: z.infer < typeof NewStudentSchema > ) {
        setLoading(true)
        if (modalType === "UPDATE") {
            const {data, error} = await supabase
                .from('Student')
                .update(values)
                .eq('student_id', EditData?.student_id)
                .select()
            console.log(error)
            console.log(data)
            if (error) {
                toast.error('Something went wrong!');
                return

            }
            if (data.length > 0) {
                toast.success('Successfully Updated');
            }
        }

        if (modalType === "INSERT") {
            const { data,error } = await supabase
                .from('Student')
                .insert({...values, parent_id:ParentID})
                .select()
            if (error) {
                toast.error('Something went wrong!');
                return

            }

            if (data) {
                toast.success('Created Successfully!');

            }
        }


        form.reset()
        reload()
        HandleOpenStudentModal()
        setLoading(false)

    }


        return (
        <div>
            <Dialog  open={openStudentModal}   >

                <DialogContent   className="overflow-y-auto  flex flex-col gap-7  sm:max-w-6xl ">
                    <DialogPrimitive.Close onClick={()=>HandleOpenStudentModal()}  className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                    <XIcon />
                    <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
                    <DialogHeader className="">
                        <DialogTitle>
                            {modalType === "INSERT"
                                ? "New Student"
                                : modalType === "VIEW"
                                    ? "View Student"
                                    : "Edit Student"}
                        </DialogTitle>
                        <DialogDescription>
                            {modalType === "INSERT"
                                ? "Add a new Student to the system. Click save when you're done."
                                : modalType === "VIEW"
                                    ? "View the Student profile information. Close the dialog when you're done."
                                    : "Update the Student profile. Click save when you're done."}
                        </DialogDescription>
                    </DialogHeader>

                    <div className="w-full ">

                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3 gap-4">

                                <FormField
                                    control={form.control}
                                    name="firstname"
                                    disabled={inputDisabledWhenViewing}
                                    render={({ field }) => (
                                        <FormItem className="gap-1">
                                            <FormLabel>First Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your first name" type="text" {...field} />
                                            </FormControl>
                                            <FormDescription>This is your given name.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    disabled={inputDisabledWhenViewing}
                                    name="lastname"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Last Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your last name" type="text" {...field} />
                                            </FormControl>
                                            <FormDescription>This is your family name.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="middlename"
                                    disabled={inputDisabledWhenViewing}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Middle Name</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your middle name" type="text" {...field} />
                                            </FormControl>
                                            <FormDescription>This is your middle name.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />

                                <FormField
                                    control={form.control}
                                    name="birthdate"
                                    disabled={inputDisabledWhenViewing}
                                    render={({ field }) => (
                                        <FormItem className="flex flex-col">
                                            <FormLabel>Date of Birth</FormLabel>
                                            <FormControl>
                                                <Input
                                                    className="pr-2 text-left relative [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:right-3"
                                                    placeholder="Select your date of birth"
                                                    type="date"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormDescription>Your birthdate is used to determine your age.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="LRN"
                                    disabled={inputDisabledWhenViewing}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Learner Reference Number (LRN)</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your LRN" type="text" {...field} />
                                            </FormControl>
                                            <FormDescription>Your unique LRN issued by the DepEd.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="gradelevel"

                                    render={({ field }) => (
                                        <FormItem className="w-full">
                                            <FormLabel>Grade Level</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger     disabled={inputDisabledWhenViewing} className="w-full pb-2">
                                                        <SelectValue placeholder="Select grade level" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="w-full pb-0">
                                                    <SelectItem value="Day Care">Day Care</SelectItem>
                                                    <SelectItem value="Kinder">Kinder</SelectItem>
                                                    {Array.from({ length: 12 }, (_, i) => (
                                                        <SelectItem  key={i + 1} value={`Grade ${i + 1}`}>
                                                            Grade {i + 1}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>Select your current grade level.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="schoolname"
                                    disabled={inputDisabledWhenViewing}
                                    render={({ field }) => (
                                        <FormItem className="gap-2">
                                            <FormLabel>School Name</FormLabel>
                                            <FormControl >
                                                <Input placeholder="Enter your school name" type="text" {...field} />
                                            </FormControl>
                                            <FormDescription>Full name of your current school.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="schooladdress"
                                    disabled={inputDisabledWhenViewing}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>School Address</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your school address" type="text" {...field} />
                                            </FormControl>
                                            <FormDescription>Location of your school.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="schoolID"
                                    disabled={inputDisabledWhenViewing}
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>School ID</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter your school ID" type="text" {...field} />
                                            </FormControl>
                                            <FormDescription>DepEd or school-issued identification number.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="schooltype"

                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>School Type</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger     disabled={inputDisabledWhenViewing} className="w-full pb-2">
                                                        <SelectValue placeholder="Select school type" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="w-full pb-0">
                                                    <SelectItem value="private">Private</SelectItem>
                                                    <SelectItem value="public">Public</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>Is your school public or private?</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                                <FormField
                                    control={form.control}
                                    name="schoollevel"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>School Level</FormLabel>
                                            <Select onValueChange={field.onChange} value={field.value}>
                                                <FormControl>
                                                    <SelectTrigger     disabled={inputDisabledWhenViewing} className="w-full pb-2">
                                                        <SelectValue placeholder="Select school level" />
                                                    </SelectTrigger>
                                                </FormControl>
                                                <SelectContent className="w-full pb-0">
                                                    <SelectItem value="Day Care">Day Care (Child Dev’t Center)</SelectItem>
                                                    <SelectItem value="Pre School">Pre School</SelectItem>
                                                    <SelectItem value="Elementary">Elementary</SelectItem>
                                                    <SelectItem value="Secondary">Secondary (Junior/Senior High)</SelectItem>
                                                    <SelectItem value="Technical Vocational Institution">Technical Vocational Institution (TVI)</SelectItem>
                                                    <SelectItem value="Higher Education Institution">Higher Education Institution (HEI)</SelectItem>
                                                </SelectContent>
                                            </Select>
                                            <FormDescription>The level of the institution you are attending.</FormDescription>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />


                          <div className="flex gap-3">
                              <FormField
                                  control={form.control}
                                  disabled={inputDisabledWhenViewing}
                                  name="schoolyearstart"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormLabel>School Year Start</FormLabel>
                                          <FormControl>
                                              <Input
                                                  placeholder="e.g., 2024"
                                                  type="text"

                                                  {...field}
                                              />
                                          </FormControl>
                                          <FormDescription>Your  school year starts.</FormDescription>
                                          <FormMessage />
                                      </FormItem>
                                  )}
                              />

                              <FormField
                                  control={form.control}
                                  disabled={inputDisabledWhenViewing}
                                  name="schoolyearend"
                                  render={({ field }) => (
                                      <FormItem>
                                          <FormLabel>School Year End</FormLabel>
                                          <FormControl>
                                              <Input
                                                  placeholder="e.g., 2024"
                                                  type="text"
                                                  {...field}
                                              />
                                          </FormControl>
                                          <FormDescription> Your school year end.</FormDescription>

                                          <FormMessage />
                                      </FormItem>
                                  )}
                              />
                          </div>

                              <FormField
                                  control={form.control}
                                  name="status"
                                  render={({ field }) => (
                                      <FormItem className="w-full ">
                                          <FormLabel>Educational Status</FormLabel>
                                          <Select         onValueChange={field.onChange}  value={field.value} >
                                              <FormControl >
                                                  <SelectTrigger     disabled={inputDisabledWhenViewing} className="w-full pb-2">
                                                      <SelectValue  placeholder="Select educational status" />
                                                  </SelectTrigger>
                                              </FormControl>
                                              <SelectContent className="w-[3rem] pb-0">
                                                  <SelectItem className="flex w-full"  value="Undergraduate"> <EducationalStatus status={"Undergraduate"}/></SelectItem>
                                                  <SelectItem className="flex w-full" value="Graduated"><EducationalStatus status={"Graduated"}/></SelectItem>
                                                  <SelectItem className="flex w-full" value="Stopped"><EducationalStatus status={"Stopped"}/></SelectItem>
                                              </SelectContent>
                                          </Select>
                                          <FormDescription>Your current educational status (e.g., undergraduate or graduated).</FormDescription>
                                          <FormMessage />
                                      </FormItem>
                                  )}
                              />


                                {modalType === "INSERT" || modalType === "UPDATE"?
                                    <Button disabled={loading} type="submit" className="mt-3 col-start-3"> {loading &&
                                        <Loader2 className={"animate-spin"}/>}Save</Button> :

                                    <Button className="mt-3 col-start-3" disabled={loading} onClick={()=>HandleOpenStudentModal()}>Close</Button>
                                }

                            </form>
                        </Form>

                    </div>
                    <DialogFooter>

                    </DialogFooter>
                </DialogContent>
            </Dialog>



        </div>
    );
}

export default StudentForm;