import React from "react";

import { auth } from "@/auth";

const Home = async () => {
  const session = await auth();

  console.log("Session:", session);
  return (
    <div>
      <h1>Welcome to Next.js</h1>
    </div>
  );
};

export default Home;
