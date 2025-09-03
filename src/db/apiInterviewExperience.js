import supabase from "./supabase";
// Add interview experience
export async function addInterviewExperience({
  userId,
  company_name,
  role,
  linkedin_url,
  github_url,
  content,
  offer_type,
  opportunity_type,
  is_public = false,
}) {
  const { data, error } = await supabase
    .from("interview_experiences")
    .insert({
      user_id: userId,
      company_name,
      role,
      linkedin_url,
      github_url,
      content,
      offer_type,
      opportunity_type,
      is_public,
    })
    .select()
    .single();

  if (error) {
    console.error("Supabase insert error:", error);
    throw new Error(error.message || "Failed to add interview experience");
  }

  return data;
}
