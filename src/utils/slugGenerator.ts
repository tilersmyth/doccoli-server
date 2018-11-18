import * as slug from "slug";

export const slugGenerator = async (value: string, model: any) => {
  try {
    const generateSlug = slug(value, { lower: true });

    const checkSlug = await model.find({
      where: { slug: generateSlug }
    });

    return checkSlug.length > 0
      ? generateSlug + "-" + (checkSlug.length + 1)
      : generateSlug;
  } catch (err) {
    throw err;
  }
};
