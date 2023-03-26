"use client";
import Link from "next/link";

function ClientSideRoute({
  children,
  route,
}: {
  children: any;
  route: string;
}) {
  return <Link href={route}>{children}</Link>;
}

export default ClientSideRoute;
