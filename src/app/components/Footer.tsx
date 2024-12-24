import Image from 'next/image';
import Link from 'next/link';

const Footer = () => {
  const teamMembers = [
    { name: 'Ho Jun', github: 'https://github.com/minjun2131' },
    { name: 'Sang Gi', github: 'https://github.com/adorable-otter' },
    { name: 'Jung Eun', github: 'https://github.com/ovezen' },
    { name: 'Da Seul', github: 'https://github.com/Raina-Moon' },
    { name: 'Hye Jin', github: 'https://github.com/choihyejin94' }
  ];

  return (
    <footer className="bg-white py-8 border-t">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="flex flex-col space-y-4">
            <div>
              <Image
                src="/images/logo.png"
                alt="Mentory_Logo"
                width={150}
                height={40}
                className="mr-4 cursor-pointer grayscale"
              />
            </div>
            <div className="flex space-x-4">
              <a
                href="https://github.com/minjun2131/Mentory"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-600 hover:text-black"
              >
                <svg
                  className="h-8 w-8"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  style={{ objectFit: 'contain' }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 2C6.48 2 2 6.48 2 12c0 4.84 3.66 8.85 8.43 9.79.62.11.84-.27.84-.6v-2.16c-3.3.72-3.98-1.61-3.98-1.61-.56-1.42-1.36-1.8-1.36-1.8-1.11-.78.08-.76.08-.76 1.23.09 1.88 1.27 1.88 1.27 1.1 1.89 2.88 1.34 3.59 1.03.11-.8.43-1.34.78-1.65-2.63-.3-5.39-1.31-5.39-5.85 0-1.29.47-2.35 1.24-3.18-.12-.31-.54-1.57.12-3.26 0 0 .99-.32 3.24 1.2a11.16 11.16 0 0 1 5.9 0c2.25-1.52 3.24-1.2 3.24-1.2.66 1.69.24 2.95.12 3.26.78.83 1.24 1.89 1.24 3.18 0 4.56-2.76 5.54-5.39 5.85.44.38.83 1.13.83 2.27v3.36c0 .33.22.71.84.59C18.34 20.85 22 16.84 22 12c0-5.52-4.48-10-10-10z"
                  />
                </svg>
              </a>
            </div>
          </div>

          {/* Menu */}
          <div className="flex space-x-16">
            <div>
              <h4 className="font-semibold mb-4">Menu</h4>
              <ul className="space-y-2">
                <li>
                  <Link href="/mentors" className="text-gray-600 hover:text-black">
                    Mentors
                  </Link>
                </li>
                <li>
                  <Link href="/mypage" className="text-gray-600 hover:text-black">
                    My Page
                  </Link>
                </li>
                <li>
                  <Link href="/mentor-request" className="text-gray-600 hover:text-black">
                    Mentor Request
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contributors</h4>
              <ul className="grid grid-cols-1 gap-4 list-none md:grid-rows-3 md:grid-flow-col">
                {teamMembers.map((member) => (
                  <li key={member.name}>
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-black"
                    >
                      {member.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
