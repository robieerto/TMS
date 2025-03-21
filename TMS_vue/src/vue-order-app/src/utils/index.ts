export function formatDate(date: string): string {
  const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
  return new Date(date).toLocaleDateString(undefined, options);
}

export function validateOrderForm(formData: any): boolean {
  const { orderNumber, customerName, waypoints } = formData;
  return (
    orderNumber && 
    customerName && 
    Array.isArray(waypoints) && 
    waypoints.length > 0
  );
}