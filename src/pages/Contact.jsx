import React, { useEffect } from "react";
import HeroSlider from "../components/HeroSlider";

const Contact = () => {
  useEffect(() => {
    document.title = "Holidayze | Register";
  }, []);
  return (
    <>
      <HeroSlider />
        <section className="section  py-14" id="home">
        <div className="container mx-auto">
          <div className="lg:flex justify-center">
            <div className="lg:w-2/3 mx-2">
              <div className="text-center">
                <h1 className="text-4xl font-semibold leading-[50px] tracking-wide text-transparent bg-clip-text bg-gradient-to-l from-accent/100 to-accent/80 mb-10">
                  Let's keep in touch.
                </h1>
                <p className="text-base text-gray-400">
                  If there is anything we can help with or that you are not
                  satisfied with do not hesitate to get in touch with us. We
                  will do our best to help you out.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section py-10">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div>
              <div className="md:flex md:flex-row lg:justify-start lg:flex-col lg:text-left md:justify-between">
                <div className="mb-6">
                  <h1 className=" text-base font-medium mb-2">Email Address</h1>
                  <a
                    className="text-gray-400 text-sm font-medium"
                    href="mailto:support.yourdomain@email.com"
                  >
                    support@holidaze.com
                  </a>
                </div>

                <div className="mb-6">
                  <h1 className=" text-base font-medium mb-2">Telephone</h1>
                  <a
                    className="text-gray-400 text-sm font-medium"
                    href="tel:+(666) 666-6666"
                  >
                    +(666) 666-6666
                  </a>
                </div>

                <div className="mb-6">
                  <h1 className=" text-base font-medium mb-2">Address</h1>
                  <h1 className="text-gray-400 text-sm">
                    666 Developer Street, Downtown Ally, Pangeia
                  </h1>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <form method="post" name="myForm" id="myForm">
                <p id="error-msg"></p>
                <div id="simple-msg"></div>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="border border-gray-300 text-gray-900 text-sm focus:ring-0 focus:border-blue-500 block w-full p-3"
                      placeholder="Your Name"
                    />

                    <input
                      type="email"
                      className="border border-gray-300 text-gray-900 text-sm focus:ring-0 focus:border-blue-500 block w-full p-3"
                      id="email"
                      name="email"
                      placeholder="Your Email"
                    />
                  </div>

                  <input
                    type="text"
                    name="subject"
                    id="subject"
                    placeholder="Subject"
                    className="border border-gray-300 text-gray-900 text-sm focus:ring-0 focus:border-blue-500 block w-full p-3"
                  />

                  <textarea
                    className="border border-gray-300 text-gray-900 text-sm focus:ring-0 focus:border-blue-500 block w-full p-3"
                    placeholder="Your Message"
                    name="comments"
                    id="comments"
                    rows="3"
                    spellCheck="false"
                  ></textarea>

                  <div className="text-right">
                    <input
                      type="submit"
                      id="submit"
                      name="send"
                      className="py-4 px-6 rounded-full uppercase cursor-pointer text-sm transition-all bg-accent/80 hover:bg-accent/50 text-white"
                      value="Send Message"
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
