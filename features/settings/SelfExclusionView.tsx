import { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useModal } from '../../context/ModalContext';
import Footer from '../../components/common/Footer';

export default function SelfExclusionView() {
  const navigate = useNavigate();
  const { showModal } = useModal();

  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const [days, setDays] = useState('');
  const [reason, setReason] = useState('');

  const handleMonthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setMonth(value);
  };

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 2);
    setDay(value);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setYear(value);
  };

  const handleDaysChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '').slice(0, 4);
    setDays(value);
  };

  const isValid =
    month.length === 2 &&
    Number(month) >= 1 &&
    Number(month) <= 12 &&
    day.length === 2 &&
    Number(day) >= 1 &&
    Number(day) <= 31 &&
    year.length === 4 &&
    Number(year) >= 1900 &&
    Number(days) > 0 &&
    reason.trim().length > 0;

  const handleSubmit = () => {
    if (!isValid) {
      showModal(
        'warning',
        'Invalid Details',
        'Please enter a valid date (MM/DD/YYYY), number of days, and reason.'
      );
      return;
    }

    const data = {
      startDate: `${month}/${day}/${year}`,
      days: Number(days),
      reason: reason.trim(),
    };

    localStorage.setItem('selfExclusion', JSON.stringify(data));
    showModal('success', 'Self-Exclusion Set', `Your account will be self-excluded from ${data.startDate} for ${data.days} day(s).`,'CONFIM');

    setMonth('');
    setDay('');
    setYear('');
    setDays('');
    setReason('');
  };

  return (
    <div className="min-h-screen text-white flex flex-col bg-black font-bahnschrift">
      {/* Header */}
      <div className="px-5 pt-6 pb-6 bg-[#121212]">
        <div className="relative flex items-center justify-center">
          <button
            onClick={() => navigate('/settings')}
            className="absolute left-0 h-12 w-12 rounded-full flex items-center justify-center transition hover:opacity-80"
            style={{ backgroundColor: 'var(--button-color)' }}
          >
            <ArrowLeft size={20} className="text-white" />
          </button>
          <h1 className="text-[24px] font-semibold uppercase">Self-Exclusion</h1>
        </div>
      </div>


      <div className='px-5 pt-3'>
        <p>Need a break from gaming?</p>
        <br/>
        <p>Self-Exclusion lets you temporarily or permanently block access to your MGame.ph account. While your account is excluded, you won't be able to log in, deposit, or play.</p>
        <br/>
        <p>Choose an option below to manage your gaming responsibly.</p>
      </div>
      {/* Form */}
      <div className="flex-1 px-5 py-6">
        <div className="space-y-3">
          {/* Date of Birth / Start Date */}
          <div className="grid grid-cols-3 gap-3">
            <input
              type="text"
              inputMode="numeric"
              placeholder="MM"
              value={month}
              onChange={handleMonthChange}
              className="w-full h-[56px] bg-[#121212] text-center text-white placeholder:italic placeholder:text-[#666] outline-none uppercase rounded-none border-none"
            />
            <input
              type="text"
              inputMode="numeric"
              placeholder="DD"
              value={day}
              onChange={handleDayChange}
              className="w-full h-[56px] bg-[#121212] text-center text-white placeholder:italic placeholder:text-[#666] outline-none uppercase rounded-none border-none"
            />
            <input
              type="text"
              inputMode="numeric"
              placeholder="YYYY"
              value={year}
              onChange={handleYearChange}
              className="w-full h-[56px] bg-[#121212] text-center text-white placeholder:italic placeholder:text-[#666] outline-none uppercase rounded-none border-none"
            />
          </div>

          <input
            type="text"
            inputMode="numeric"
            placeholder="NUMBER OF DAYS"
            value={days}
            onChange={handleDaysChange}
            className="w-full h-[56px] bg-[#121212] text-center text-white placeholder:italic placeholder:text-[#666] outline-none uppercase rounded-none border-none"
          />

          <input
            type="text"
            placeholder="REASON"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full h-[56px] bg-[#121212] text-center text-white placeholder:italic placeholder:text-[#666] outline-none uppercase rounded-none border-none"
          />

          <button
            onClick={handleSubmit}
            disabled={!isValid}
            className="w-full h-[56px] flex items-center justify-center rounded-none border-none bg-[#121212] transition disabled:cursor-not-allowed"
          >
            <span className={`font-bold text-[18px] uppercase ${isValid ? 'text-white' : 'text-[#666]'}`}>Submit</span>
          </button>
        </div>
      </div>

      <div className="text-center text-[#666] text-sm uppercase tracking-widest mb-2">
        Policies
      </div>

      <div className="px-5 py-4">
        <Footer />
      </div>
    </div>
  );
}
