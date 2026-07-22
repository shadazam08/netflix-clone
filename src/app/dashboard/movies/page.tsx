import { auth } from "@/auth";

import { redirect } from "next/navigation";

import { MovieService } from "@/server/services";

import {ContentArea, AdminBreadcrumb } from "@/components/layout/admin";

import {Card} from "@/components/ui/card";
import {PageHeader} from "@/components/ui/page-header";

import MoviesClient from "@/components/dashboard/movies/MoviesClient";

export default async function MoviesPage() {
  const session = await auth();

  if (
    !session ||
    !session.user ||
    (
      session.user.role !== "ADMIN" &&
      session.user.role !== "SUPER_ADMIN"
    )
  ) {
    redirect("/login");
  }

  const movieService =
    new MovieService();

  const movies =
    await movieService.findAll();

  return (
    <ContentArea>
      <AdminBreadcrumb
        items={[
          {
            label: "Dashboard",
            href: "/dashboard",
          },
          {
            label: "Movies",
          },
        ]}
      />

      <PageHeader
        title="Movies"
        description="Manage movie catalog."
      />

      <Card>
        <MoviesClient
          initialMovies={movies}
        />
      </Card>
    </ContentArea>
  );
}