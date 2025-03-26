"use client";

import CountUp from 'react-countup';

export default function Home() {
  return (
    <>
        {/* Banner Section ======================== */}
        <section className="text-center py-20 relative">
          <div className="container">
            <h2 className="text-4xl mb-2">Hi 👋, I am Muntasir Ahmed</h2>
            {/* <div class="bg-gradient-to-r from-pink-500 via-[rgba(217,70,239,0.2)] to-purple-500 h-64 w-full"></div> */}

            <p style={{lineHeight: '1.7rem'}} className={""}>I am a running CSE (Bachelors degree at Computer Science and Engineering) Student on 4th year at ZHSUT. I can describe my university life as a balance between academics and extracurricular activities. I am very passionate competitive programmer. I love solving complex problems and breaking them down to simple tasks. I also participate in different hackathons and programming competitions.In terms of technology and framework, I am very comfortable with C++ and Javascript and have done many projects with them. I am also a good team player. Being part of teams I participated and won many programming and development related competitions.I have good leadership skills. In my college life and also in my university life I organized and volunteered in many national level events.My life motto is to be better than yesterday. I try to learn new things everyday. I try to follow a strict routine and punctual. And apart from all this tech stuff I really love traveling. I absolutely love hiking and trekking. And in my free time, I read books or watch movies. I also love to talk with strangers about no particular topic whatsoever I love.</p>

          <div className="flex justify-around text-xl mt-12">
            {/* <div className="bg-[#18191B] px-16 py-10">
              <h2>Year</h2>
            </div> */}
            <div>
              <h2 className="text-xl text-[#18191B]">Year</h2>
              <p className="text-[#18191B] text-6xl"><CountUp start={0} end={0}/></p>
            </div>
            <div>
              <h2 className="text-xl text-[#18191B]">Months</h2>
              <p className="text-[#18191B] text-6xl"><CountUp start={0} end={10}/></p>
            </div>
            <div>
              <h2 className="text-xl text-[#18191B]">Days</h2>
              <p className="text-[#18191B] text-6xl"><CountUp start={0} end={8}/></p>
            </div>
            <div>
              <h2 className="text-xl text-[#18191B]">22 April</h2>
              <p className="text-[#18191B] text-6xl"><CountUp start={0} end={-26}/></p>
            </div>
          </div>

          </div>
          {/* Bg Gradient Color */}
          <div className="absolute inset-0 bg-gradient-to-r from-violet-500/20 via-fuchsia-500/20 to-cyan-500/20 opacity-30 blur-3xl"></div>
        </section>
    </>
  )
}