/** A shareable booking destination for Google Business Profile, ads and every site CTA. */
export const bookingPath = '/book-appointment';

/** Preserves the context of a CTA while sending the visitor to the full booking page. */
export const bookingHref = (service = '', location = '', detail = '', offer = '') => {
  const query = new URLSearchParams();
  if (service) query.set('service', service);
  if (location) query.set('salon', location);
  if (detail) query.set('detail', detail);
  if (offer) query.set('offer', offer);
  const suffix = query.toString();
  return suffix ? `${bookingPath}?${suffix}` : bookingPath;
};
