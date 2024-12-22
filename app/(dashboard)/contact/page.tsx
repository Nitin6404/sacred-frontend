import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { phoneArr, sacredShaadiAddress } from "@/constants/data";
import Team from "./team";
import { getUrlMetadataForSeo } from "@/app/utils/functions";
import { Metadata } from "next";

export default function ContactUs() {
  return (
    <div className="flex min-h-dvh flex-col">
      <section className="w-full border-b py-12">
        <div className="container space-y-10 px-4 md:px-6 xl:space-y-16">
          <div className="mx-auto grid max-w-[1300px] gap-4 px-4 sm:px-6 md:gap-16 lg:grid-cols-2">
            <div className="flex flex-col gap-2">
              <h1 className="lg:leading-tighter text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-[3.4rem] 2xl:text-[3.75rem]">
                Contact Us
              </h1>
              <p className="mx-auto max-w-[700px] tracking-tight text-muted-foreground md:text-xl">
                Have a question or want to work together? Reach out to us and we&apos;ll get back to you as soon as
                possible.
              </p>
            </div>
            <Card className="grid grid-cols-1 items-center justify-center gap-2 shadow-lg md:grid-cols-2">
              <Image
                src="/contact.gif"
                alt="phone"
                unoptimized
                width={20}
                height={20}
                className="center-fixed col-span-1 h-full w-full"
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
              />
              <section className="col-span-1 flex flex-col">
                <CardHeader>
                  <CardTitle className="text-lg">Sacred Shaadi</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <p>{sacredShaadiAddress}</p>
                    </div>
                    <nav className="flex items-center gap-1 font-semibold">
                      <a href={`tel:${phoneArr[0]}`} className="text-sm text-muted-foreground hover:text-primary">
                        {phoneArr[0]}
                      </a>
                      <div className="text-muted-foreground">|</div>
                      <a href={`tel:${phoneArr[1]}`} className="text-sm text-muted-foreground hover:text-primary">
                        {phoneArr[1]}
                      </a>
                    </nav>
                  </div>
                </CardContent>

                <Link href={"#"} target="_blank" className="mx-auto mb-4">
                  <Button className="w-fit font-semibold shadow-xl">Get Direction</Button>
                </Link>
              </section>
            </Card>
          </div>
        </div>
      </section>
      <section className="max-h-2/5 min-h-[250px] w-full">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3683.686112839623!2d88.4288974754405!3d22.5908401794787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a02759831abf981%3A0xa5891178491a472c!2sSalt%20Lake%20-%20Kestopur%20Brg%2C%20SA%20Block%2C%20Sector%20II%2C%20Bidhannagar%2C%20West%20Bengal!5e0!3m2!1sen!2sin!4v1725954652768!5m2!1sen!2sin"
          height="600"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="min-h-[450px] w-full"
        ></iframe>
      </section>
      {/* <section className="flex flex-col items-center justify-center gap-8 border-b p-6 md:flex-row md:items-start md:justify-between md:p-8 lg:p-12">
        <h1 className="text-xl tracking-tighter md:text-3xl lg:text-4xl xl:text-6xl">
          Our Client&apos;s reviews
          <br /> for <span className="font-bold text-primary">Sacred Shaadi</span>
        </h1>
        <Card className="max-w-4/5 w-[800px] shadow-lg">
          <CardHeader>
            <CardTitle className="text-lg">Write a Review</CardTitle>
            <CardDescription className="font-semibold">
              Share your thoughts and experiences with others.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="review" className="font-semibold">
                  Your Review
                </Label>
                <Textarea id="review" placeholder="Share your review here..." rows={4} />
              </div>
              <div className="rating">
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
                <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
              </div>
              <Button type="submit" className="font-semibold shadow-xl">
                Submit Review
              </Button>
            </form>
          </CardContent>
        </Card>
      </section> */}
      <Team />
    </div>
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const data = await getUrlMetadataForSeo({
    routeUrl: "/contact",
    fallbackTitle: "Contact | Sacred Shadi",
    fallbackDescription:
      "Sacredshaadi provides a range of wedding services to solve all your wedding planning woes. So sit back, relax and plan your wedding with us with the click of a button"
  });
  return data;
}

export const revalidate = 60;
