import { Button } from "./ui/button.tsx"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog.tsx"
import { Input } from "./ui/input.tsx"
import * as z from "zod"


import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "./ui/form.tsx"

import {
    Loader2,
    PlusIcon, XIcon
} from "lucide-react"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "./ui/select.tsx"
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {NewMemberSchema} from "../Schema/FormSchemas.ts";
import EducationalStatus from "./EducationalStatus.tsx";
import supabase from "../supabase-config/supabase.tsx"
import * as React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {MemberData} from "../interfaces/Memberinterface.ts";
import {useState} from "react";


interface FormProps {
    reload: ()=>void
    open:boolean
    EditedData:MemberData | undefined
    HandleInsertModal: ()=>void
    modaltype:string | undefined
    CloseModal:()=>void
    mode:string
}


export function FormMember({reload,open,EditedData,HandleInsertModal,modaltype,CloseModal,mode} : FormProps) {
    const [loading,setloading]=useState<boolean>(false)
    const defaultValues = {
        firstname: "" ,
        lastname: "",
        address: "",
        birthdate: "",
        school: "",
        status: "",
        contact: "",
    }
    const form = useForm < z.infer < typeof NewMemberSchema >> ({
        resolver: zodResolver(NewMemberSchema),
        defaultValues: defaultValues,
    })
    React.useEffect(() => {
        if (EditedData) {
            form.reset({...EditedData, birthdate: EditedData?.birthdate.toString()});
        }
    }, [EditedData]);

    async function onSubmit(values: z.infer < typeof NewMemberSchema > ) {
        setloading(true)
        try {
          if (modaltype === "UPDATE"){
              const { error } = await supabase
                  .from('member')
                  .update(values)
                  .eq('user_id', EditedData?.user_id)

              console.log(error)
          }else {
              const { error } = await supabase
                  .from('member')
                  .insert(values)

              if (error) {
                  console.log(error)
              }

          }



            form.reset()
            reload()
            toast.success('Created Successfully!');
            CloseModal()
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Something went wrong");
        }finally {
            setloading(false)
        }
    }

    const ResetValues=()=>{
        HandleInsertModal()
        form.reset(defaultValues)
    }
    const isInputIsViewingOnly:boolean=modaltype === "VIEW"

    return (
        <Dialog   open={open}     >

            {mode === "Archived" &&  <Button onClick={ResetValues} ><PlusIcon/></Button>}


            <DialogContent   className="overflow-y-auto  flex flex-col gap-7  sm:max-w-3xl ">
                <DialogPrimitive.Close onClick={CloseModal} className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                    <XIcon />
                    <span className="sr-only">Close</span>
                </DialogPrimitive.Close>
                <DialogHeader className="">
                    <DialogTitle>
                        {modaltype === "INSERT"
                            ? "New Member"
                            : modaltype === "VIEW"
                                ? "View Member"
                                : "Edit Member"}
                    </DialogTitle>
                    <DialogDescription>
                        {modaltype === "INSERT"
                            ? "Add a new member to the system. Click save when you're done."
                            : modaltype === "VIEW"
                                ? "View the member's profile information. Close the dialog when you're done."
                                : "Update the member's profile. Click save when you're done."}
                    </DialogDescription>
                </DialogHeader>


                <div className="w-full ">

                <Form  {...form}>
                    <form  onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">

                        <FormField
                            control={form.control}
                            name="firstname"
                          disabled={isInputIsViewingOnly}
                            render={({ field }) => (
                                <FormItem className={"gap-1"}>
                                    <FormLabel>First Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your first name"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>This is your first name as displayed publicly.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="lastname"
                            disabled={isInputIsViewingOnly}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Last Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your last name"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>This is your last name as displayed publicly.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="address"
                            disabled={isInputIsViewingOnly}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Address</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your address"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>This is your current residential address.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="birthdate"
                            disabled={isInputIsViewingOnly}
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
                                    <FormDescription>Your date of birth is used to calculate your age.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="school"
                            disabled={isInputIsViewingOnly}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>School</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your school name"
                                            type="text"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>This is the school you are currently attending or have attended.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"

                            render={({ field }) => (
                                <FormItem className="w-full ">
                                    <FormLabel>Educational Status</FormLabel>
                                    <Select  disabled={isInputIsViewingOnly}        onValueChange={field.onChange}  value={field.value} >
                                        <FormControl >
                                            <SelectTrigger className="w-full pb-2">
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

                        <FormField
                            control={form.control}
                            name="contact"
                            disabled={isInputIsViewingOnly}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contact Number</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your contact number"
                                            type="tel"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>Your primary contact number for communication.</FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {modaltype === "VIEW" ?
                            <Button onClick={CloseModal} type={"button"}>Close</Button>:
                            <Button disabled={loading} type="submit"> {loading&&<Loader2 className={"animate-spin"}/>}Save</Button>

                    }

                    </form>
                </Form>

            </div>
                <DialogFooter>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}



