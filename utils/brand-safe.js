const brandSafeSlugs = [
  '10-things-to-do-immediately-after-you-graduate-from-college',
  'ciara-has-finally-let-the-world-in-on-the-prayer',
  'frankie-beverly-speaks-on-his-long-time-friendship-with-beyonce-and-the-surprise-remake-of-their-classic-hit',
  'grey-hair-dont-care-rihanna-hired-68-year-old-model-joani-johnson-to-star-in-her-fenty-campaign',
  'missy-elliott-is-first-hip-hop-artist-to-receive-honorary-doctorate-from-prestigious-berklee-college-of-music',
  'this-grandpa-who-stepped-in-as-his-granddaughters-prom-date-ended-up-being-quite-the-head-turner',
  'three-essential-steps-black-millennials-can-take-to-improve-black-heart-health'
]

export const isSlugBrandSafe = (slug) => {
  return brandSafeSlugs.indexOf(slug) >= 0
}
