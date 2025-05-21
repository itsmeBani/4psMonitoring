import {Button} from "./ui/button.tsx"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "./ui/dialog.tsx"
import {Input} from "./ui/input.tsx"
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

import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {NewMemberSchema} from "../Schema/FormSchemas.ts";

import supabase from "../supabase-config/supabase.tsx"
import * as DialogPrimitive from "@radix-ui/react-dialog";
import {MemberData} from "../interfaces/Memberinterface.ts";
import React, {useState} from "react";
import {StudentData} from "../interfaces/StudentInterface.ts";


interface FormProps {
    reload: () => void
    open: boolean
    EditedData: MemberData | StudentData | undefined
    HandleInsertModal: () => void
    modaltype: string | undefined
    CloseModal: () => void
    mode: string
}


export function FormMember({open, HandleInsertModal, modaltype, CloseModal, mode,reload, EditedData}: FormProps) {
    const [loading, setloading] = useState<boolean>(false)
    const defaultValues = {
        firstname: "",
        lastname: "",
        address: "",
        middle_name: "",
        birthdate: "",
        contact: "",
        house_no: ""
    }
    const form = useForm<z.infer<typeof NewMemberSchema>>({
        resolver: zodResolver(NewMemberSchema),
        defaultValues: defaultValues,
    })
    React.useEffect(() => {

        if (EditedData) {

            form.reset({...EditedData, birthdate: new Date(EditedData?.birthdate).toISOString().split("T")[0]});
        }
    }, [EditedData]);

    const inputDisabledWhenViewing=modaltype === "VIEW"

    async function onSubmit(values: z.infer<typeof NewMemberSchema>) {
        setloading(true)

            if (modaltype === "UPDATE") {
                const {data, error} = await supabase
                    .from('Member')
                    .update(values)
                    .eq('parent_id', EditedData?.parent_id)
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

            if (modaltype === "INSERT") {
                const {data, error} = await supabase
                    .from('Member')
                    .insert(values)
                    .select()
                if (error) {
                    toast.error('Something went wrong!');
                    return

                }

                if (data) {
                    toast.success('Created Successfully!');

                }
            }


        CloseModal()
        form.reset()
        setloading(false)
        reload()

    }

    const ResetValues = () => {
        HandleInsertModal()
        form.reset(defaultValues)
    }


    return (
        <Dialog open={open}>

            {mode === "Archived" && <Button onClick={ResetValues}><PlusIcon/></Button>}


            <DialogContent className="overflow-y-auto  flex flex-col gap-7  sm:max-w-3xl ">
                <DialogPrimitive.Close onClick={CloseModal}
                                       className="ring-offset-background focus:ring-ring data-[state=open]:bg-accent data-[state=open]:text-muted-foreground absolute top-4 right-4 rounded-xs opacity-70 transition-opacity hover:opacity-100 focus:ring-2 focus:ring-offset-2 focus:outline-hidden disabled:pointer-events-none [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4">
                    <XIcon/>
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
                        <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">

                            <FormField
                                control={form.control}
                                name="firstname"
                                disabled={inputDisabledWhenViewing}
                                render={({field}) => (
                                    <FormItem className={"gap-1"}>
                                        <FormLabel>First Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your first name"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>This is your first name as displayed
                                            publicly.</FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="lastname"
                                disabled={inputDisabledWhenViewing}
                                render={({field}) => (
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
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="middle_name"
                                disabled={inputDisabledWhenViewing}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Middle Name</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your middle name"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>This is your last name as displayed publicly.</FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                disabled={inputDisabledWhenViewing}
                                render={({field}) => (
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
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="birthdate"
                                disabled={inputDisabledWhenViewing}
                                render={({field}) => (
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
                                        <FormDescription>Your date of birth is used to calculate your
                                            age.</FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="house_no"
                                disabled={inputDisabledWhenViewing}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>House No</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your House No"
                                                type="text"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>This is the the House no to track your house</FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />


                            <FormField
                                control={form.control}
                                name="contact"
                                disabled={inputDisabledWhenViewing}
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Contact Number</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Enter your contact number"
                                                type="tel"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>Your primary contact number for
                                            communication.</FormDescription>
                                        <FormMessage/>
                                    </FormItem>
                                )}
                            />

                            {modaltype === "INSERT" || modaltype === "UPDATE" ?
                                <Button disabled={loading} type="submit"> {loading &&
                                    <Loader2 className={"animate-spin"}/>}Save</Button> :
                                <Button disabled={loading} onClick={CloseModal}>Close</Button>
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



