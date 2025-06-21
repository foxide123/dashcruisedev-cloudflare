import Link from "next/link";

export default function WebsitesTab() {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-xl">
      <h1 className="text-3xl font-bold mb-4">Pages</h1>
      {/*       <input
        type="text"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search pages..."
        className="mb-4 w-full border rounded-full px-4 py-2 focus:ring-2 focus:ring-indigo-400"
      /> */}

      <div className="overflow-x-auto grid grid-cols-3 gap-x-10 gap-y-20 mt-10">
        {/* Home Page */}
        <div className="rounded-xl overflow-hidden">
          <div className="w-full h-[300px] shadow-xl rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/b5d3c209-2c30-4c07-1831-9b2ab594fa00/mobile640x480"
            />
          </div>
          <p className="text-center text-xl mt-5 font-semibold">Home Page</p>
          <Link href="/dashboard/websites/nitra-solutions/pages/home" className="mx-auto block w-fit bg-gray-200 mt-4 px-15 py-2 rounded-xl">
            Edit
          </Link>
        </div>
        {/* Services Page */}
        <div className="rounded-xl overflow-hidden">
          <div className="w-full h-[300px] shadow-xl rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/4d2673b0-285b-4745-1aa1-a53fa7ceaf00/mobile640x480"
            />
          </div>
          <p className="text-center text-xl mt-5 font-semibold">
            Services Page
          </p>
          <Link href="/dashboard/websites/nitra-solutions/pages/services" className="mx-auto block w-fit bg-gray-200 mt-4 px-15 py-2 rounded-xl">
            Edit
          </Link>
        </div>
        {/* Projects Page */}
        <div className="rounded-xl overflow-hidden">
          <div className="w-full h-[300px] shadow-xl rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/23686e60-63d3-4b66-02ef-6b69723da800/mobile640x480"
            />
          </div>
          <p className="text-center text-xl mt-5 font-semibold">
            Projects Page
          </p>
          <Link href="" className="mx-auto block w-fit bg-gray-200 mt-4 px-15 py-2 rounded-xl">
            Edit
          </Link>
        </div>
        {/* About Page */}
        <div className="rounded-xl overflow-hidden">
          <div className="w-full h-[300px] shadow-xl rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/dde31fe4-f518-4508-f8d0-73b259113800/mobile640x480"
            />
          </div>
          <p className="text-center text-xl mt-5 font-semibold">
            About Page
          </p>
          <Link href="#" className="mx-auto block w-fit bg-gray-200 mt-4 px-15 py-2 rounded-xl">
            Edit
          </Link>
        </div>
        {/* Blog Page */}
        <div className="rounded-xl overflow-hidden">
          <div className="w-full h-[300px] shadow-xl rounded-xl overflow-hidden">
            <img
              className="w-full h-full object-cover"
              src="https://imagedelivery.net/Ap_RIQMnvK_LYOq1vIFisQ/2d44034b-4f06-44eb-5b26-2f8a055e6500/mobile640x480"
            />
          </div>
          <p className="text-center text-xl mt-5 font-semibold">
            Blog Page
          </p>
          <Link href="#" className="mx-auto block w-fit bg-gray-200 mt-4 px-15 py-2 rounded-xl">
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
}
