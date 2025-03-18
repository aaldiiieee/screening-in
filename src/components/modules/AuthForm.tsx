import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthForm = () => {
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
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="example@domain.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="dark">Login</Button>
          </CardFooter>
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
            <div className="space-y-1">
              <Label htmlFor="fullname">Full name</Label>
              <Input id="fullname" type="text" placeholder="John Doe" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="example@domain.com" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" placeholder="••••••••" />
            </div>
          </CardContent>
          <CardFooter>
            <Button variant="dark">Register</Button>
          </CardFooter>
        </Card>
      </TabsContent>
    </Tabs>
  );
};

export default AuthForm;
