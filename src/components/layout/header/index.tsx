import { Container } from '@/features/shared/components';
import { Link } from '@/libs/navigation';

export function Header() {
  return (
    <header className="py-4 border-b border-gray-200">
      <Container>
        <div className="flex justify-between items-center">
          <Link href="/" className="font-bold text-xl">
            Feature App
          </Link>
          <nav>
            <ul className="flex gap-6">
              <li>
                <Link href="/" className="hover:text-blue-600">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/example/2" className="hover:text-blue-600">
                  Features
                </Link>
              </li>
              <li>
                <Link href="/cart" className="hover:text-blue-600">
                  Cart
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </Container>
    </header>
  );
}
