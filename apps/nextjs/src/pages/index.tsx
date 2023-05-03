import type { AppRouter } from "@acme/api";
import {
  Button,
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  ScrollArea,
} from "@acme/ui";
import { UserButton, useAuth } from "@clerk/nextjs";
import type { inferProcedureOutput } from "@trpc/server";
import { Trash2 } from "lucide-react";
import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { api } from "~/utils/api";

const PostCard: React.FC<{
  post: inferProcedureOutput<AppRouter["post"]["all"]>[number];
  onDelete: () => void;
}> = ({ post, onDelete }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>{post.content}</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="destructive" onClick={onDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};

const Home: NextPage = () => {
  const postQuery = api.post.all.useQuery();

  const utils = api.useContext();

  const deletePostMutation = api.post.delete.useMutation({
    onSettled: () => utils.post.all.invalidate(),
  });

  const handleDeleteButtonClick = (id: string) => {
    if (confirm("Do you want to delete this post?")) {
      deletePostMutation.mutate(id);
    }
  };

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen h-full flex-col items-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-8">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">T3</span> Turbo
          </h1>
          <AuthShowcase />

          <ScrollArea className="h-[60vh] rounded-md border">
            <div className="p-4">
              <h4 className="mb-4 text-sm font-medium leading-none">Posts</h4>
              {postQuery.data ? (
                <div className="flex flex-col gap-4">
                  {postQuery.data?.map((p) => {
                    return (
                      <PostCard
                        key={p.id}
                        post={p}
                        onDelete={() => handleDeleteButtonClick(p.id)}
                      />
                    );
                  })}
                </div>
              ) : (
                <p>Loading..</p>
              )}
            </div>
          </ScrollArea>
        </div>
      </main>
    </>
  );
};

export default Home;

const AuthShowcase: React.FC = () => {
  const { isSignedIn } = useAuth();
  const { data: secretMessage } = api.auth.getSecretMessage.useQuery(
    undefined,
    { enabled: !!isSignedIn },
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      {isSignedIn && (
        <>
          <p className="text-center text-2xl text-white">
            {secretMessage && (
              <span>
                {" "}
                {secretMessage} click the user button!
                <br />
              </span>
            )}
          </p>
          <div className="flex items-center justify-center">
            <UserButton
              appearance={{
                elements: {
                  userButtonAvatarBox: {
                    width: "3rem",
                    height: "3rem",
                  },
                },
              }}
            />
          </div>
        </>
      )}
      {!isSignedIn && (
        <p className="text-center text-2xl text-white">
          <Link href="/sign-in">Sign In</Link>
        </p>
      )}
    </div>
  );
};
