export function MiddleInput(props: any) {
  return (
    <div>
      <label htmlFor="email-address" className="sr-only">
        Email
      </label>
      <input
        name={props.name}
        type={props.type || "text"}
        required={props.required}
        placeholder={props.placeholder}
        className="relative block w-full appearance-none rounded-none border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus: outline-none focus:ring-indigo-500 sm:text-sm"
      />
    </div>
  );
}
