
import {Toaster} from "sonner";
import {
    Form,
    FormControl,

    FormField,
    FormItem,
    FormLabel,
    FormMessage
} from "../components/ui/form.tsx";
import {Input} from "../components/ui/input.tsx";
import {Button} from "../components/ui/button.tsx";
import {Loader2} from "lucide-react";
import {useAuth} from "../Context/AuthProvider.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "../components/ui/card.tsx";
import Logo from  "../assets/LOGO.png"

function Login() {
const {form,HandleLogin,loading}=useAuth()

    return (
<>

    <section className="grid grid-cols-2   gap-5  w-full p-10 place-items-center  h-screen  justify-center">
        <aside className="flex flex-col   place-items-center gap-5 justify-center h-full w-full">
            <header className="text-center">
                <h1 className="Kerif text-5xl text-gray-700  ">
                    Pantawid Pamilyang Pilipino <span className="text-green-600">Program</span> Monitoring
                </h1>
                <p className=" text-base text-gray-800   ">
                    A centralized monitoring system designed to track and support beneficiaries of the Pantawid Pamilyang Pilipino Program (4Ps)
                </p>
            </header>

        </aside>
        <aside className="flex flex-col place-items-center gap-5 h-full justify-center w-full">
            <img alt=""  src={Logo} className={"w-[100px]"}/>
            <Card className="w-[450px] py-10">
                <CardHeader className="">
                    <CardTitle className="CircularFont text-2xl text-gray-700  leading-4">Welcome Back</CardTitle>
                    <CardDescription className="CircularFont text-gray-700 ">
                        Please sign in to continue to your account.
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(HandleLogin)} className="w-full space-y-2">
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input className="border-[1px] border-gray-500" placeholder="johndoe@gmail.com" {...field} />

                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <Input className="border-[1px] border-gray-500" placeholder="******" {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Button className={"w-[70px] mt-2 CircularFont bg-green-700"}   type="submit">{loading ? <Loader2 className="animate-spin" /> :"Login"}</Button>
                        </form>
                    </Form>
                </CardContent>
            </Card>


        </aside>
    </section>

    <Toaster theme={"dark"} richColors={true} position="top-right" />
</>
    );
}

export default Login;