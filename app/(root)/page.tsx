import Link from "next/link";
import React from "react";

import QuestionCard from "@/components/cards/QuestionCard";
import HomeFilter from "@/components/filters/HomeFilter";
import LocalSearch from "@/components/search/LocalSearch";
import { Button } from "@/components/ui/button";
import ROUTES from "@/constants/routes";
import handleError from "@/lib/handlers/error";
import { ValidationError } from "@/lib/http-errors";

const questions = [
  {
    _id: "1",
    title: "How to learn React?",
    description: "I want to learn React, please help me",
    tags: [
      { _id: "1", name: "React" },
      { _id: "2", name: "Javascript" },
    ],
    author: {
      _id: "1",
      name: "Wesley",
      image:
        "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR6zcMFxzxEKpKled2S3Z6Hv-aFRZyovfDmf9Ed925yTRcfchQ-JQoOyjqxpJbmprrwRC5Odvbjs8yT5ykglL9W7h0VywfeD3iEzaEHIQ",
    },
    upvotes: 10,
    answers: 2,
    views: 100,
    createdAt: new Date(),
  },
  {
    _id: "2",
    title: "How to learn Javascript",
    description: "I want to learn Javscript, but js don't like me",
    tags: [{ _id: "1", name: "Javascript" }],
    author: {
      _id: "1",
      name: "Wesley",
      image:
        "https://blogapi.perrian.com/wp-content/uploads/2024/03/cropped-mrunal-thakur-nosepin.jpeg",
    },
    upvotes: 12,
    answers: 5,
    views: 60,
    createdAt: new Date("2025-08-03"),
  },
];

const test = async () => {
  try {
    throw new ValidationError({
      title: ["Required"],
      tags: ['"JavaScript" is not a valid tag.'],
    });
  } catch (error) {
    return handleError(error);
  }
};

interface SearchParams {
  searchParams: Promise<{ [key: string]: string }>;
}

const Home = async ({ searchParams }: SearchParams) => {
  await test();
  const { query = "", filter = "" } = await searchParams;

  const filteredQuestions = questions.filter((question) => {
    const matchesQuery = question.title
      .toLowerCase()
      .includes(query.toLowerCase());
    const matchesFilter = filter
      ? question.tags[0].name.toLowerCase() === filter.toLowerCase()
      : true;
    return matchesQuery && matchesFilter;
  });

  return (
    <>
      <section className="flex w-full flex-col-reverse sm:flex-row justify-between gap-4 sm:items-center">
        <h1 className="h1-bold text-dark100_light900">All Questions</h1>
        <Button
          className="primary-gradient min-h-[46px] px-4 py-3 !text-light-900"
          asChild>
          <Link href={ROUTES.ASK_QUESTION}>Ask a question</Link>
        </Button>
      </section>
      <section className="mt-11">
        <LocalSearch
          route="/"
          imgSrc="/icons/search.svg"
          placeholder="Search questions..."
          otherclass="flex-1"
        />
      </section>
      <HomeFilter />
      <div className="mt-10 flex w-full flex-col gap-6">
        {filteredQuestions.map((question) => (
          <QuestionCard
            key={question._id}
            question={question}
          />
        ))}
      </div>
    </>
  );
};

export default Home;
