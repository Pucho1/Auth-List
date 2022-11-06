import React, {useState} from 'react'
import { useForm, SubmitHandler  } from "react-hook-form";

type Inputs = {
    firstName: string;
  };
const Tes: React.FC = () => {
const [nuevo, setnuevo]= useState();
const { register, handleSubmit } = useForm<Inputs>();

const onSubmit: SubmitHandler<Inputs> = data => { console.log(data);};

return (
<form onSubmit={handleSubmit(onSubmit)}>
    <input
      {...register("firstName", { required: "Please enter your first name." })} // custom message
    />
    <input type="submit" />
  </form>
);

};
export default Tes;