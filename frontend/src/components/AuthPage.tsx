import React from "react";
import axios from "axios"; 
import type { User } from "@/app/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type AuthPageProps = {
  onAuth: (user: User) => void;
};

const AuthPage = (props: AuthPageProps) => {
  const [username, setUsername] = React.useState("");
  const [isDisabled, setIsDisabled] = React.useState(false);
  const [emptyusername, setEmptyusername] = React.useState(false);

  const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
    setIsDisabled(true);
    event.preventDefault();
    if (username === "") {
      setEmptyusername(true);
      return;
    }
    axios.post("http://localhost:3001/api/authenticate", { username: username })
    .then((response) => {
      console.log(response.data);
      props.onAuth({ ...response.data, secret: username });
    })
    .catch((error) => {
      console.log(error);
    });
  };

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.value) {
      setEmptyusername(false);
    }
    setUsername(event.target.value);
  };

  return (
    <div className="w-full h-full flex items-center justify-center">
      <Card className="card w-[400px] sm:[300px] border border-black flex flex-col items-start justify-center">
        <CardHeader className="flex items-start">
          <CardTitle className="text-[40px]">Welcome 👋</CardTitle>
          <CardDescription className="font-semibold text-white">
            Set a username to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col items-start gap-y-6">
            <Input
              type="text"
              placeholder="username"
              onChange={(e) => {
                handleUsernameChange(e);
              }}
              className="w-[300px] sm:[200px]"
            />
          </form>
          {emptyusername && (
            <p className="text-red-500 text-[12px] mt-[2px] font-semibold">
              Username cannot be empty
            </p>
          )}
        </CardContent>
        <CardFooter>
          <Button
            onClick={(event) => {
              handleSubmit(event);
            }}
            className="w-[300px] sm:[200px] bg-black text-white rounded-lg"
            disabled={isDisabled}
          >
            Enter
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthPage;
