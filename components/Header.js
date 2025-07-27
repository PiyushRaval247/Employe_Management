export default function Header() {
  return (
    <div className="text-center">
      <h1 className="text-4xl font-bold text-gray-900 mb-2">
        Employee Management
      </h1>
      <p className="text-lg text-gray-600 mb-4">
        A beginner-friendly full-stack application with Next.js, Redux Toolkit, and MongoDB
      </p>
      <div className="flex justify-center space-x-4 text-sm text-gray-500">
        <span>• Next.js App Router</span>
        <span>• Redux Toolkit</span>
        <span>• Tailwind CSS</span>
        <span>• MongoDB</span>
      </div>
    </div>
  )
} 