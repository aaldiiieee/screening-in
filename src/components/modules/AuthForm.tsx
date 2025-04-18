import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { useForm } from "react-hook-form";
import { LoginPayload, RegisterPayload } from "@/types/services";
import { useAuth } from "@/hooks/useAuth";
import { useSession } from "@/context/AuthContext";
import { useNavigate } from "react-router";
import { IAuthContext } from "@/types/context";

const AuthForm = () => {
  const { loginMutation, registerMutation } = useAuth();
  const { signIn } = useSession() as IAuthContext;
  const navigate = useNavigate();

  const formLogin = useForm<LoginPayload>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const formRegister = useForm<RegisterPayload>({
    defaultValues: {
      fullname: "",
      email: "",
      password: "",
    },
  });

  const onSubmitLogin = (data: LoginPayload) => {
    loginMutation.mutate(data, {
      onSuccess: (response) => {
        signIn?.(`${response.token_type} ${response.access_token}`);
        navigate("/");
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        if (error.response?.data) {
          const errorData = error.response.data;
          alert(errorData.message);
        } else {
          alert("Terjadi kesalahan saat login");
        }
      },
    });
  };

  const onSubmitRegister = (data: RegisterPayload) => {
    registerMutation.mutate(data, {
      onSuccess: () => {
        window.location.reload();
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        if (error.response?.data) {
          const errorData = error.response.data;
          alert(errorData.message);
        } else {
          alert("Terjadi kesalahan saat register");
        }
      },
    });
  };

  return (
    <Tabs defaultValue="login" className="w-[400px]">
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login">Login</TabsTrigger>
        <TabsTrigger value="register">Register</TabsTrigger>
      </TabsList>

      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Welcome back!</CardTitle>
            <CardDescription>
              Enter your email and password to login
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...formLogin}>
              <form
                onSubmit={formLogin.handleSubmit(onSubmitLogin)}
                className="space-y-4"
              >
                <FormField
                  control={formLogin.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@domain.com"
                          {...field}
                          {...formLogin.register("email", { required: true })}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={formLogin.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          {...field}
                          {...formLogin.register("password", {
                            required: true,
                          })}
                          type="password"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button variant="dark" type="submit">
                  Login
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="register">
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Enter your email below to create your account
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Form {...formRegister}>
              <form
                className="space-y-4"
                onSubmit={formRegister.handleSubmit(onSubmitRegister)}
              >
                <FormField
                  control={formRegister.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="John Doe"
                          {...field}
                          {...formRegister.register("fullname", {
                            required: true,
                          })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formRegister.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="example@domain.com"
                          {...field}
                          {...formRegister.register("email", {
                            required: true,
                          })}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={formRegister.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="••••••••"
                          {...field}
                          {...formRegister.register("password", {
                            required: true,
                          })}
                          type="password"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <Button variant="dark" type="submit">
                  Register
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AuthForm;
