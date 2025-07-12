"use client";

import Ratings from "./ratings";
import ReviewCard from "./review-card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

const reviewsData = [
  {
    name: "Nikki Mitchell",
    rating: 5,
    isVerified: false,
    reviewText:
      "We’re always looking for ways to reduce waste and work more sustainably, so we’re excited to start using our new NFC-enabled business cards from V1CE.Instead of handing out printed cards, our team now use a single, reusable digital card that shares their contact details instantly with a tap or QR code scan. No more stacks of paper cards - just simple, smart networking that cuts down on waste.Not only does this reduce paper use, it also means we can update details in real time, so we’re always sharing accurate information with clients and contacts.A small step, but another move towards more sustainable, efficient ways of working.",
    mediaSrc: null,
    mediaType: null,
    reply: null,
  },
  {
    name: "Graham B., Director of Photography / B2 Videography",
    rating: 5,
    isVerified: true,
    reviewText:
      "I’ve worked in creative production for over a decade, so I’ve seen more networking gimmicks than I can count. The V1CE card looks impressive and always gets a comment, but that’s just the opener. The real value lies in what happens after someone taps it.The software does the follow-up for me. It captures leads, syncs with my CRM, and even lets me pre-load content I want people to see. I’ve gone from handing out cards and hoping people call, to knowing they already saved me, saw my reel, and have a meeting link in their inbox.That shift in workflow from hopeful to proactive is what makes this a staple in my kit now.",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/qpi81d1wqo280efcfjd5muat.png",
    mediaType: "image",
    reply: null,
  },
  {
    name: "Ian B.",
    rating: 5,
    isVerified: true,
    reviewText:
      "I am a Heating & Plumbing engineer, in and out of houses all day, forever getting asked for business cards, which are easily lost. The V1CE card has been a real game changer, clients can now save my contact card with all my information on which has also got a direct link to my google review page. Ive seen some reviews saying it was difficult to set up, Id personally disagree but thats just my opinion.",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/rrd5q8l3tuvpnonpfmemcx49.jpeg",
    mediaType: "image",
    reply: {
      author: "Team V1CE",
      logoSrc: "/images/logos/v1ce-logo-white.svg", // Placeholder for V1CE logo
      text: "Appreciate the honesty, Ian — and love that it’s been a game changer on the go! 👨‍🔧🔥",
    },
  },
  {
    name: "Rosie H.",
    rating: 5,
    isVerified: true,
    reviewText:
      "Love it! Super super happy with this product. It saves the printing and shipping of paper cards and it really leaves an impression on people. I love that you can adjust what link people get any time you like. What a great idea. I wont turn back after using this, super happy customer. Also it looks great and was made so quickly. I really appreciate all the videos demonstrating how to use the card too. Its very well considered.",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/shune6twu5odt741em8yhbqg.jpeg",
    mediaType: "image",
    reply: {
      author: "Team V1CE",
      logoSrc: "/images/logos/v1ce-logo-white.svg",
      text: "Glad it’s hitting the mark for you! Appreciate the love 🙌",
    },
  },
  {
    name: "Dawn T.",
    rating: 5,
    isVerified: true,
    reviewText:
      "Using V1ce cards has made us as a company much greener as we no longer need to take printed collateral to our in-person events. Easy and quick to load and to update",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/ay8vtx251bvblv68j7jgci4u.jpeg",
    mediaType: "image",
    reply: null,
  },
  {
    name: "Sarah, Eclore",
    rating: 5,
    isVerified: true,
    reviewText:
      "I’m not very techy, but this was super simple to set up. And now I don’t have to explain what I do—my V1CE profile does it for me in 5 seconds.",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/video/kd5x0c8h7dufd6ca3mk7n8eo.mp4",
    mediaType: "video",
    reply: {
      author: "Team V1CE",
      logoSrc: "/images/logos/v1ce-logo-white.svg",
      text: "So glad it’s making waves for you, Anna 🙌",
    },
  },
  {
    name: "Paul D.",
    rating: 5,
    isVerified: true,
    reviewText:
      "This is not only a great product that works flawlessly, it impresses EVERYONE who sees it in action. But even more impressive is the support team at V1CE, they are unequalled and go out of their way to assure customer satisfaction and provide technical assistance at every stage if you need it.  My company now uses more than 17 (black metal) cards and I'm certain we will be offering more.  Congrats to a great company, with a great product, and a great team.",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/qoe5tbatn0auhk7uakwb5xmg.jpeg",
    mediaType: "image",
    reply: null,
  },
  {
    name: "Kieran H",
    rating: 5,
    isVerified: true,
    reviewText:
      "I’m a property consultant. I build funnels, I track conversions, I measure every inch of a customer journey. I say this with zero exaggeration: the automated follow-up inside V1CE is one of the most profitable tools I’ve used this year.I connected it to my calendar and CRM. Every time someone taps my card or scans the table talker at an event, they’re not just getting my info they’re receiving a personalised email from me 30 minutes later, with a call link and tailored next steps.",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/t3xw6ws57rczw62dkb1tbd59.png",
    mediaType: "image",
    reply: null,
  },
  {
    name: "H&H",
    rating: 5,
    isVerified: true,
    reviewText:
      "For those who are attending, in our efforts to reduce our carbon footprint, we’ve gone paperless! Simply tap and hold or scan the barcode on our V1CECONNECTIONS  table tents. This will take you to a link tree that hosts all of our social media accounts (it’s now easier than ever to follow us😉), our website, and finally, links to all of our product range brochures on the stand.",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/mq0qbz9n3z23twfvgfxoyyli.jpeg",
    mediaType: "image",
    reply: null,
  },
  {
    name: "John H.",
    rating: 5,
    isVerified: true,
    reviewText:
      "I am a real estate agent in the Coachella Valley. This will be a huge time saver and also make me look like a techno saavy kind of guy. Very pleased i order this!",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/n0d6jgtq60iekjrt2fto847p.jpeg",
    mediaType: "image",
    reply: {
      author: "Team V1CE",
      logoSrc: "/images/logos/v1ce-logo-white.svg",
      text: "Tech-savvy and time-saving? You’re basically the 007 of real estate now. Glad it's working for you!",
    },
  },
  {
    name: "Jonathan H.",
    rating: 5,
    isVerified: true,
    reviewText:
      "I am a photographer and the V1CE card has helped me connect with clients quicker. I am happy I made the decision to get the V1CE card.",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/jolpt4inm31o59vr1td8dopl.jpeg",
    mediaType: "image",
    reply: null,
  },
  {
    name: "Rosli M.",
    rating: 5,
    isVerified: true,
    reviewText:
      "So pleased I gave V1CE ago, brilliant idea and a great business card, looks very professional indeed. Setting up is easy and I like the linktr.ee concept. I could customize it to my needs and events easily and super fast. The product is high quality and easy to use. Thanks V1CE.",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/xxih4099go7pmuvazwzdw1r0.jpeg",
    mediaType: "image",
    reply: null,
  },
  {
    name: "Anna M, Event Planner.",
    rating: 5,
    isVerified: true,
    reviewText:
      "Honestly didn’t think a card could make such a difference. But at my last event, I made 12 new connections. Real ones. People remembered me because of that smooth tap-to-save moment. It just feels modern, slick, and effortless.",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/asqzmdijk5d8x276yn79qcw3.jpeg",
    mediaType: "image",
    reply: {
      author: "Team V1CE",
      logoSrc: "/images/logos/v1ce-logo-white.svg",
      text: "So glad it’s making waves for you, Anna 🙌",
    },
  },
  {
    name: "Patricia Ee",
    rating: 5,
    isVerified: false, // Assuming not verified as per HTML
    reviewText:
      "The V1CE digital card has been a game changer for its classy look, speed to connect with my networks and supporting sustainability. BONUS point, I can custom my business card to different needs and profiles of my network. Super amazing & highly recommended for business professionals!",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/jsdfx3scko1ln69yoh0xo1ho.jpeg",
    mediaType: "image",
    reply: null,
  },
  {
    name: "Vanessa M",
    rating: 5,
    isVerified: true,
    reviewText:
      "As someone who’s in and out of meetings all week, I need to travel light. Adding my V1CE card to my Apple Wallet might sound like a small feature, but it’s had a big impact.Now, even when I forget my physical card, I’m still ready. I can share my profile in seconds, straight from my phone. Clients have actually complimented how smooth and polished it feels.It’s one of those little things that, once you have it, becomes second nature. And in business, those little things matter.",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/ehw13xm72yg350z5yddmmbxk.png",
    mediaType: "image",
    reply: null,
  },
  {
    name: "Daniel B.",
    rating: 5,
    isVerified: true,
    reviewText: "Im a builder. V1ce makes business cards a thing of the past.",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/qukkvit6olhpl01vznhhnd4p.jpeg",
    mediaType: "image",
    reply: {
      author: "Team V1CE",
      logoSrc: "/images/logos/v1ce-logo-white.svg",
      text: "Tech-savvy and time-saving? You’re basically the 007 of real estate now. Glad it's working for you!",
    },
  },
  {
    name: "VIANNEY P.",
    rating: 5,
    isVerified: true,
    reviewText:
      "I got my V1CE card last year! Its been amazing for my work, people always ask me how did I do that with a card?! (Im a creative director) and Im working for this company Don Caballero this is the owner and I decided to offer him a new amazing presentation card he was truly in love! He already knew how it works since I use my card with him to Introduce myself before. Thank you!! Im getting happy new clients",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/jvz1rkjj5c7zwjfmsr9hunrk.jpeg",
    mediaType: "image",
    reply: {
      author: "Team V1CE",
      logoSrc: "/images/logos/v1ce-logo-white.svg",
      text: "Now that’s a smooth intro! We love hearing how it’s helping you land those new clients, Vianney 👏",
    },
  },
  {
    name: "Amir G.",
    rating: 5,
    isVerified: true,
    reviewText: "Its become my new AMEX cardI never leave home without it!!",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/easrajajvh0et9ihd0ptk07u.jpeg",
    mediaType: "image",
    reply: null,
  },
  {
    name: "Crazy Bear",
    rating: 5,
    isVerified: false, // Assuming not verified as per HTML
    reviewText:
      "Can’t lie, I just wanted something cooler than the guys I was pitching next to. Turns out it also helped me close 3 deals. So… flex AND function? I’ll take it.",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/r43yax0j5y08e55u58wslbmq.png",
    mediaType: "image",
    reply: null,
  },
  {
    name: "Ben T.",
    rating: 5,
    isVerified: true,
    reviewText:
      "What a tremendous product!  It has truly reinvented the entire business card game. Gone are the days of typos in contact information and losing business cards. This product makes a statement and is extremely useful. From here on...V1CE cards for me.",
    mediaSrc:
      "https://cdn.v1cetest.co.uk/reviews/image/jqp3jx7djh8pzx1jw10b9qve.jpeg",
    mediaType: "image",
    reply: {
      author: "Team V1CE",
      logoSrc: "/images/logos/v1ce-logo-white.svg",
      text: "From here on… it’s V1CE all the way 😎 Thanks for the kind words, Ben!",
    },
  },
];

export default function ProductReviewsSection({ center }) {
  return (
    <section className={center ? "center-narrow" : ""}>
      <section
        id="reviews-section"
        className="center-wide my-16 flex flex-col items-center gap-7 !px-0"
      >
        <div className="flex w-full items-center justify-between gap-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Ratings rating={4.84} size={20} />
              <span className="text-sm font-medium">4.84/5</span>
            </div>
            <h2 className="text-3xl font-semibold">Reviews</h2>
            <span className="font-medium text-muted-foreground">
              3317 reviews
            </span>
          </div>
          <Button
            className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] text-sm font-semibold leading-[102%] transition-all disabled:pointer-events-none disabled:opacity-50 border border-transparent bg-primary text-primary-foreground hover:bg-primary/80 h-10 px-5 py-2 w-fit"
            type="button"
          >
            See All Reviews
          </Button>
        </div>
        <Separator className="shrink-0 bg-accent h-[1px] w-full" />
        <div className="relative w-full">
          <div className="absolute bottom-0 z-10 h-20 w-full bg-gradient-to-b from-transparent to-background"></div>
          <div className="grid max-h-[1000px] grow grid-cols-1 gap-4 overflow-hidden sm:grid-cols-2 lg:grid-cols-3">
            {reviewsData.map((review, index) => (
              <ReviewCard key={index} {...review} />
            ))}
          </div>
        </div>
        <Button
          className="inline-flex items-center justify-center gap-1 whitespace-nowrap rounded-[10px] text-sm font-semibold leading-[102%] transition-all disabled:pointer-events-none disabled:opacity-50 border border-transparent bg-primary text-primary-foreground hover:bg-primary/80 h-10 px-5 py-2 w-fit"
          type="button"
        >
          See All Reviews
        </Button>
      </section>
    </section>
  );
}
