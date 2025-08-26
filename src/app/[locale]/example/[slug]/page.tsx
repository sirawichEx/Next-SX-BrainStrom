import { Container } from "@/features/shared/components";
import { getMetadata } from "@/libs/utils";


export async function generateMetadata() {
  return getMetadata({
    title: 'Example Page',
    description: 'This is an example page demonstrating dynamic routes.',
  });
}
export default async function ExamplePage() {
  return (
    <Container>
      <div className="py-12">
        <h1 className="text-3xl font-bold mb-4">Example Page:</h1>
        <p className="text-gray-600">
          This is an example page demonstrating dynamic routes.
        </p>
      </div>
    </Container>
  );
}
