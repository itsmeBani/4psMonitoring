import { Button } from "./ui/button.tsx"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
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
    PlusIcon
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

interface FormProps {
    reload: ()=>void
}

export function FormMember({reload} : FormProps) {
    const form = useForm < z.infer < typeof NewMemberSchema >> ({
        resolver: zodResolver(NewMemberSchema),
        defaultValues: {
            firstname: "",
            lastname: "",
            address: "",
            birthdate: "",
            school: "",
            status: "",
            contact: "",
        },
    })

    async function onSubmit(values: z.infer < typeof NewMemberSchema > ) {
        try {
            const { error } = await supabase
                .from('member')
                .insert(values)

            if (error) {
                console.log(error)
            }
            form.reset()
            reload()
            toast.success('Created Successfully!');
        } catch (error) {
            console.error("Form submission error", error);
            toast.error("Something went wrong");
        }
    }
    return (
        <Dialog   >
            <DialogTrigger asChild>
                <Button ><PlusIcon/></Button>
            </DialogTrigger>
            <DialogContent   className="overflow-y-auto  flex flex-col gap-7  sm:max-w-3xl ">
                <DialogHeader className="">
                    <DialogTitle>Edit profile</DialogTitle>
                    <DialogDescription>
                        Make changes to your profile here. Click save when you're done.
                    </DialogDescription>
                </DialogHeader>
            <div className="w-full ">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-2 gap-4">

                        <FormField
                            control={form.control}
                            name="firstname"
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
                                <FormItem className="w-full">
                                    <FormLabel>Educational Status</FormLabel>
                                    <Select onValueChange={field.onChange}  >
                                        <FormControl>
                                            <SelectTrigger className="w-full">
                                                <SelectValue  placeholder="Select educational status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent className="w-[3rem] ">
                                            <SelectItem className="flex w-full"  value="Undergraduate"> <EducationalStatus status={"Undergraduate"}/></SelectItem>
                                            <SelectItem className="flex w-full" value="Graduated"><EducationalStatus status={"Graduated"}/></SelectItem>
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

                        <Button type="submit">Submit</Button>

                    </form>
                </Form>

            </div>
                <DialogFooter>

                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}



