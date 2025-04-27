import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="text-center text-sm text-muted-foreground md:text-left">
          &copy; {new Date().getFullYear()} マイブログ. All rights reserved.
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <Link
            href="/"
            className="transition-colors hover:text-foreground"
          >
            ホーム
          </Link>
          <Link
            href="#"
            className="transition-colors hover:text-foreground"
          >
            このサイトについて
          </Link>
          <Link
            href="#"
            className="transition-colors hover:text-foreground"
          >
            お問い合わせ
          </Link>
        </div>
      </div>
    </footer>
  );
}