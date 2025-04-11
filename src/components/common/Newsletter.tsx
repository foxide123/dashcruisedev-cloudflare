"use client";

import { useForm } from "react-hook-form";
import { AlertBox } from "@/components/common/AlertBox";
import { useTranslations } from "next-intl";

export function Newsletter() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  //eslint-disable-next-line
  const onSubmit = (data: any) => console.log({ data });

  const newsletterData = useTranslations("newsletter");

  return (
    <div className="w-full bg-amber-500 flex lg:flex-row flex-col justify-between rounded-[10px] py-[24px] px-[32px]">
      <div className="flex flex-col text-white text-2xl font-bold ">
        <h2>
          {newsletterData.rich("header", {
            br: () => <br />,
          })}
        </h2>
      </div>
      <div className="flex lg:flex-row lg:items-center lg:mt-0 mt-3 flex-col text-sm font-normal">
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            type="email"
            {...register("email", {
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: `${newsletterData("invalidEmailError")}`,
              },
            })}
            placeholder={`${newsletterData("placeholder")}`}
            className="bg-white p-3 rounded-md text-sm lg:w-[600px] w-full"
          />
          {errors.email && <AlertBox message={`${errors.email.message}`} />}
          <button
            type="submit"
            className="lg:ml-3 lg:mt-0 mt-3 bg-black text-white p-2 rounded-md font-bold text-lg cursor-pointer"
          >
            {newsletterData("cta")}
          </button>
        </form>
      </div>
    </div>
  );
}
