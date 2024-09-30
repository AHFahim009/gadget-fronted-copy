import ClientWrapper from "@/providers/ClientWrapper";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <ClientWrapper>{children}</ClientWrapper>;
}
