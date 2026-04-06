import mikePortrait from "../assets/mikeportrait.png";
import beccaPortrait from "../assets/beccaportrait.png";
import { supabase } from "./supabase";

const coachImageMap = {
  "mikeportrait.png": mikePortrait,
  "beccaportrait.png": beccaPortrait,
};

const placeholderImage = "https://via.placeholder.com/300x400/3452a3/ffffff?text=Photo+Coming+Soon";

const normalizeCoach = (coach) => ({
  ...coach,
  key_specialties: Array.isArray(coach?.key_specialties) ? coach.key_specialties : [],
});

export const fetchActiveCoaches = async () => {
  const { data, error } = await supabase
    .from("coaches")
    .select("*")
    .eq("active", true)
    .order("sort_order")
    .order("name");

  if (error) throw error;

  return (data || []).map(normalizeCoach);
};

export const getCoachImageUrl = (coach) => {
  if (coach?.image_url) return coach.image_url;
  if (coach?.image && coachImageMap[coach.image]) return coachImageMap[coach.image];
  return placeholderImage;
};

export const getCoachSummary = (coach) => {
  const summaryParts = [];

  if (coach?.years_experience) {
    summaryParts.push(`${coach.years_experience}+ years of coaching experience`);
  }

  if (coach?.main_certification) {
    summaryParts.push(coach.main_certification);
  }

  if (summaryParts.length > 0) {
    return `${summaryParts.join(". ")}.`;
  }

  if (coach?.key_specialties?.length) {
    return `Specializes in ${coach.key_specialties.slice(0, 2).join(" and ")}.`;
  }

  return "Personalized coaching focused on steady improvement and confident play.";
};