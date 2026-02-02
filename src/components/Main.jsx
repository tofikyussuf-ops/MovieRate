export default function Main({ children }) {
  return (
    <main className="mx-auto mt-8 mb-12 flex w-full max-w-[95%] max-w-[140rem] flex-col items-start justify-center gap-4 p-4 sm:flex-row sm:gap-10 lg:max-w-[1600px] lg:gap-8">
      {children}
    </main>
  );
}
