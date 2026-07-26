"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  contentSchema,
  type ContentFormData,
} from "@/schemas/content";

import { createContentAction } from "@/actions/content/create-content";
import { updateContentAction } from "@/actions/content/update-content";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/ui/form-error";

interface ContentFormProps {
  type: "MOVIE" | "TV_SHOW";

  mode?: "create" | "edit";

  defaultValues?: Partial<ContentFormData>;
}

export function ContentForm({
  type,
  mode = "create",
  defaultValues,
}: ContentFormProps) {
  const router = useRouter();

  const [serverError, setServerError] = useState("");

  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContentFormData>({
    resolver: zodResolver(contentSchema),

    defaultValues: {
      id: defaultValues?.id,

      type,

      title: defaultValues?.title ?? "",

      shortDescription:
        defaultValues?.shortDescription ?? "",

      description:
        defaultValues?.description ?? "",

      releaseDate:
        defaultValues?.releaseDate,

      duration:
        defaultValues?.duration,

      ageRating:
        defaultValues?.ageRating ?? "",

      status:
        defaultValues?.status ?? "DRAFT",
    },
  });

  const onSubmit = (values: ContentFormData) => {
    setServerError("");

    startTransition(async () => {
      const parsed = contentSchema.safeParse(values);

      if (!parsed.success) {
        return;
      }

      const result =
        mode === "create"
          ? await createContentAction(parsed.data)
          : await updateContentAction(parsed.data);

      if (!result.success) {
        setServerError(
          result.message ??
          `Failed to ${mode === "create"
            ? "create"
            : "update"
          } content.`,
        );

        return;
      }

      if (result.redirectTo) {
        router.push(result.redirectTo);

        router.refresh();
      }
    });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
    >
      <input
        type="hidden"
        {...register("id")}
      />

      <input
        type="hidden"
        {...register("type")}
      />

      <input
        type="hidden"
        {...register("status")}
      />

      <div>
        <Input
          placeholder="Title"
          {...register("title")}
        />

        <FormError
          message={errors.title?.message}
        />
      </div>

      <div>
        <Input
          placeholder="Short Description"
          {...register(
            "shortDescription",
          )}
        />

        <FormError
          message={
            errors.shortDescription?.message
          }
        />
      </div>

      <div>
        <textarea
          {...register("description")}
          placeholder="Description"
          className="min-h-40 w-full rounded-md border border-neutral-700 bg-neutral-900 p-3 text-white outline-none"
        />

        <FormError
          message={
            errors.description?.message
          }
        />
      </div>

      <div>
        <Input
          type="date"
          {...register("releaseDate", {
            valueAsDate: true,
          })}
        />
      </div>

      <div>
        <Input
          type="number"
          placeholder="Duration (Minutes)"
          {...register("duration", {
            valueAsNumber: true,
          })}
        />
      </div>

      <div>
        <Input
          placeholder="Age Rating"
          {...register("ageRating")}
        />
      </div>

      <FormError message={serverError} />

      <Button
        type="submit"
        disabled={isPending}
      >
        {isPending
          ? mode === "create"
            ? "Creating..."
            : "Updating..."
          : mode === "create"
            ? "Create Content"
            : "Update Content"}
      </Button>
    </form>
  );
}