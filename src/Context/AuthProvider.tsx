import {createContext, PropsWithChildren, useContext, useEffect, useState} from "react";
import {z} from "zod";
import {useForm, UseFormReturn} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import supabase from "../supabase-config/supabase.tsx";
import {toast} from "sonner";
import { FormSchema } from "../Schema/FormSchemas.ts";

export type UserData = {
    Id  :string
    data:never
    avatar:string
    name:string
};

interface AuthProviderData {
    HandleLogin:(DATA:z.infer<typeof FormSchema>)=>void
    HandleLogout:()=>void
    loading:boolean
    form: UseFormReturn<z.infer<typeof FormSchema>>
    User: UserData[] | undefined |  null
}

const AuthContext = createContext<AuthProviderData | null>(null)


export const AuthProvider = ({children}: PropsWithChildren) => {

    const [loading,setLoading]=useState<boolean>(false)
    const [User,setUser]=useState<UserData[] | null>()
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            username: "",
            password:""
        },
    })



    async function HandleLogin (DATA: z.infer<typeof FormSchema>){
        setLoading(true)
        const { data, error } = await supabase.auth.signInWithPassword({
            email: DATA?.username,
            password: DATA?.password,
        })
        if (data.user && data?.session) {
            toast.success('Login successful! Welcome back.');
        }

        if (error) {
            toast.error('Login failed. Please check your credentials and try again.');
        }
        setLoading(false)

    }
    async function HandleLogout (){
        const { error } = await supabase.auth.signOut()

        if (!error){
            toast.success('Logout successful');
            setUser(null)
        }
    }





    useEffect(()=>{
        supabase.auth.onAuthStateChange(async (event,session) => {
            if (event !== 'SIGNED_IN') {
                console.log(session)
                setUser(undefined)
            }else {
                fetchUser()
            }
        })
        fetchUser()
    },[])



    const fetchUser:()=>void=async ()=>{
        const { data: { user } } = await supabase.auth.getUser()
        const { data } = await supabase
            .from('Admin')
            .select()
            .eq('Id', user?.id)

           if (data && data.length <= 0) {
               setUser(null)
               return
           }
            setUser(data)
           }




    return <AuthContext.Provider
        value={{
          User,
            HandleLogin,
            HandleLogout,
            form,
            loading
    }}>
        {children}
    </AuthContext.Provider>

}

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "authContext has to be used within AuthProvider"
        );
    }

    return context;
};