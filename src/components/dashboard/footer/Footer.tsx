"client";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-background border-t">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-muted-foreground">
              © 2023 Your Company. All rights reserved.
            </p>
          </div>
          <div className="flex space-x-4">
            <Link
              href="/terms"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Terms
            </Link>
            <Link
              href="/privacy"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Privacy
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
