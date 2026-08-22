import React, { useState, useEffect } from 'react';
import { apiService } from '../../services/api';

export default function ExamRoom() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const data = await apiService.getExamQuestions();
        setQuestions(data);
      } catch (error) {
        console.error('Gagal memuat soal ujian:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleSelectOption = (questionId, option) => {
    setSelectedAnswers({
      ...selectedAnswers,
      [questionId]: option,
    });
  };

  const handleSubmitExam = () => {
    let correctCount = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.answer) {
        correctCount += 1;
      }
    });
    const finalScore = Math.round((correctCount / questions.length) * 100);
    setScore(finalScore);
    setSubmitted(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <p className="text-gray-500 font-medium animate-pulse">
          Menyiapkan soal ujian dari database cloud...
        </p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center">
        <div className="bg-white p-8 rounded-xl shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            Ujian Selesai!
          </h2>
          <p className="text-gray-600 mb-6">
            Berikut adalah hasil evaluasi nilai ujian online Anda:
          </p>
          <div className="text-5xl font-extrabold text-blue-600 mb-4">
            {score}{' '}
            <span className="text-lg font-medium text-gray-500">/ 100</span>
          </div>
          <button
            onClick={() => {
              setSubmitted(false);
              setSelectedAnswers({});
              setCurrentIndex(0);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
          >
            Ulangi Ujian
          </button>
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIndex];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="bg-white rounded-xl shadow-md p-6 sm:p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-6 border-b pb-4">
          <h2 className="text-xl font-bold text-gray-900">
            Tryout Online / Ujian
          </h2>
          <span className="text-sm font-semibold bg-blue-50 text-blue-600 px-3 py-1 rounded-full">
            Soal {currentIndex + 1} dari {questions.length}
          </span>
        </div>

        <div className="mb-6">
          <p className="text-lg font-medium text-gray-800 mb-4">
            {currentQ.question}
          </p>
          <div className="space-y-3">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswers[currentQ.id] === opt;
              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(currentQ.id, opt)}
                  className={`w-full text-left p-4 rounded-lg border font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {opt}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center pt-4 border-t">
          <button
            onClick={() => setCurrentIndex((prev) => Math.max(prev - 1, 0))}
            disabled={currentIndex === 0}
            className={`px-4 py-2 rounded-lg font-medium border cursor-pointer ${
              currentIndex === 0
                ? 'opacity-50 cursor-not-allowed border-gray-200 text-gray-400'
                : 'border-gray-300 hover:bg-gray-50 text-gray-700'
            }`}
          >
            Sebelumnya
          </button>

          {currentIndex < questions.length - 1 ? (
            <button
              onClick={() =>
                setCurrentIndex((prev) =>
                  Math.min(prev + 1, questions.length - 1)
                )
              }
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Selanjutnya
            </button>
          ) : (
            <button
              onClick={handleSubmitExam}
              className="bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg transition-colors cursor-pointer"
            >
              Kirim Jawaban
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
