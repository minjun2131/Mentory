import Link from 'next/link';

const Mentors = () => {
  // 가상 데이터
  const mentors = [
    { id: 1, role: 'Frontend', name: 'Mentor', club: 'Sparta Coding Club', quote: 'Ya neodu gaebalja hal su isseo' },
    { id: 2, role: 'Backend', name: 'Mentor', club: 'Sparta Coding Club', quote: 'Ya neodu gaebalja hal su isseo' },
    { id: 3, role: 'Designer', name: 'Mentor', club: 'Sparta Coding Club', quote: 'Ya neodu gaebalja hal su isseo' },
    { id: 4, role: 'Fullstack', name: 'Mentor', club: 'Sparta Coding Club', quote: 'Ya neodu gaebalja hal su isseo' },
    { id: 5, role: 'Frontend', name: 'Mentor', club: 'Sparta Coding Club', quote: 'Ya neodu gaebalja hal su isseo' },
    { id: 6, role: 'Backend', name: 'Mentor', club: 'Sparta Coding Club', quote: 'Ya neodu gaebalja hal su isseo' }
  ];

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* 배경 이미지 섹션 */}
      <div
        className="h-64 bg-cover bg-center"
        style={{ backgroundImage: "url('/your-image.jpg')" }} // 이미지 경로 수정 필요
      >
        <div className="h-full bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-white text-3xl font-bold">Our Mentors</h1>
        </div>
      </div>

      {/* 멘토 카드 섹션 */}
      <div className="max-w-6xl mx-auto py-12">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">Our Mentors</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {mentors.map((mentor) => (
            <div key={mentor.id} className="bg-white shadow-md rounded-lg overflow-hidden p-4">
              {/* 프로필 이미지 */}
              <div className="w-full h-40 bg-gray-300 rounded-md"></div>
              {/* 내용 */}
              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-700">{mentor.role}</h3>
                <p className="text-gray-500 text-sm">{mentor.name}</p>
                <p className="text-gray-400 text-sm mt-2">{mentor.club}</p>
                <p className="italic text-gray-600 text-sm mt-2">{`"${mentor.quote}"`}</p>
              </div>
              {/* 채팅 버튼 */}
              <div className="mt-4">
                <Link
                  href={`/mentors/${1}`}
                  className="bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded-md w-full hover:bg-blue-600"
                >
                  Show 💬
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Mentors;
