"use client";

import { useForm } from "react-hook-form";
import { AlertBox } from "@/components/common/AlertBox";
import { useTranslations } from "next-intl";
import { newsletterSignup } from "@/app/actions/newsletterActions";
import { useState } from "react";
import PopupModal from "../modals/PopupModal";

export function Newsletter() {
  const {
    register,
    formState: { errors },
  } = useForm();

  const [showPopup, setShowPopup] = useState(false);
  const [alert, setAlert] = useState<{
    type: "error" | "success";
    message: string;
  } | null>(null);

  const t = useTranslations("newsletter");

  return (
    <div className="w-full bg-amber-500 flex lg:flex-row flex-col justify-between rounded-[10px] py-[24px] px-[32px]">
      <div className="flex flex-col text-white text-2xl font-bold ">
        <h2>
          {t.rich("header", {
            br: () => <br />,
          })}
        </h2>
      </div>
      <div className="flex lg:flex-row lg:items-center lg:mt-0 mt-3 flex-col text-sm font-normal">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const result = await newsletterSignup({
              formData,
              invalidEmailErrorText: t("invalidEmailError"),
              emailExistsErrorText: t("emailExistsError"),
              unknownErrorText: t("unknownError"),
            });

            if (result?.success) {
              setShowPopup(true);
              console.log("Setting show popup to true");
              setTimeout(() => setShowPopup(false), 3000);
            } else if (result?.error) {
              setAlert({
                type: "success",
                message: "Signup Error " + result.error,
              });

              setTimeout(() => setAlert(null), 5000);
            }
          }}
        >
          <input
            type="email"
            {...register("email", {
              required: "Required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: `${t("invalidEmailError")}`,
              },
            })}
            placeholder={`${t("placeholder")}`}
            className="bg-white p-3 rounded-md text-sm lg:w-[600px] w-full"
          />
          {errors.email && <AlertBox message={`${errors.email.message}`} />}
          <button
            type="submit"
            className="lg:ml-3 lg:mt-0 mt-3 bg-black text-white p-2 rounded-md font-bold text-lg cursor-pointer"
          >
            {t("cta")}
          </button>
          {showPopup && (
            <PopupModal
              onClose={() => setShowPopup(false)}
              message="Newsletter Signup Success"
            />
          )}
          {alert && <AlertBox message={alert.message} />}
        </form>
      </div>
    </div>
  );
}
