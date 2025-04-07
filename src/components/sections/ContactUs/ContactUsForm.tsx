"use client";

import { useState } from "react";
import { handleFormSubmition } from "@/app/actions";
import PopupModal from "@/components/modals/PopupModal";
import { useTranslations } from "next-intl";

export default function ContactUsForm({
  padding,
  marginTop,
}: {
  padding?: string;
  marginTop?: string;
}) {
  const [showPopup, setShowPopup] = useState(false);
  const [pending, setPending] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    message: "",
  });

  const contactFormData = useTranslations("contactForm");

  return (
    <div className={`lg:w-[747px] ${marginTop} rounded-lg`}>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setPending(true);

          const formData = new FormData(e.currentTarget);

          const result = await handleFormSubmition(formData);
          setPending(false);
          if (result?.success) {
            setShowPopup(true);
            console.log("Setting show popup to true");
            setFormValues({ name: "", email: "", message: "" });
            setTimeout(() => setShowPopup(false), 3000);
          } else if (result?.error) {
            console.error("Validation or server error:", result.error);
            // You could also show a toast or inline error here
          }
        }}
        className={`flex flex-col ${padding}`}
      >
        <input
          type="text"
          id="nameInput"
          name="name"
          value={formValues.name}
          onChange={(e) =>
            setFormValues({ ...formValues, name: e.target.value })
          }
          required
          placeholder={contactFormData("name")}
          className="border-1 p-5 outline-none rounded-md"
        />
        <input
          type="email"
          id="emailInput"
          name="email"
          required
          value={formValues.email}
          onChange={(e) =>
            setFormValues({ ...formValues, email: e.target.value })
          }
          placeholder={contactFormData("email")}
          className="border-1 mt-5 p-5 outline-none rounded-md"
        />
        <textarea
          name="message"
          required
          value={formValues.message}
          onChange={(e) =>
            setFormValues({ ...formValues, message: e.target.value })
          }
          placeholder={contactFormData("message")}
          className="border-1 mt-5 p-5 h-50 outline-none rounded-md"
        />
        <button
          type="submit"
          className="w-[215px] cursor-pointer text-base font-bold leading-6 rounded-4xl bg-carrot-500 text-white mt-5 p-5"
        >
          {pending ? `${contactFormData("sending")}` : `${contactFormData("send")}`}
        </button>
        {showPopup && <PopupModal onClose={() => setShowPopup(false)} />}
      </form>
    </div>
  );
}
