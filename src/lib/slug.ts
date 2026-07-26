export async function generateUniqueSlug(
  title: string,
  exists: (slug: string) => Promise<boolean>
) {
  const baseSlug = title
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

  let slug = baseSlug;
  let count = 1;

  while (await exists(slug)) {
    slug = `${baseSlug}-${count}`;
    count++;
  }

  return slug;
}
