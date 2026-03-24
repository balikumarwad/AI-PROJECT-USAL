'use client';

import React, { useState } from 'react';
import {
  Database,
  FileText,
  User,
  Settings,
  CreditCard,
  Zap,
  Users,
  MapPin,
  GraduationCap,
  BookOpen,
  CheckCircle,
  Briefcase,
  DollarSign,
  Upload,
  UploadCloud,
  Plus,
  Clock,
  Globe,
  Calendar,
  Phone,
  Mail,
  AlignLeft,
  Building,
  Trash2,
  X,
  ChevronDown,
  Star,
  BarChart2,
  Tag,
  Award,
  Gift,
  Wallet,
  Zap as Lightning,
  ArrowRight,
} from 'lucide-react';

export default function MockVisaDashboard() {
  // Global State
  const [currentPage, setCurrentPage] = useState('overview');
  const [basicCompleted, setBasicCompleted] = useState(false);

  // Basic Info
  const [activeBasicTab, setActiveBasicTab] = useState('personal');
  const [personalDetails, setPersonalDetails] = useState({
    fullName: '',
    dob: '',
    gender: '',
    nationality: '',
    maritalStatus: '',
  });
  const [familyMembers, setFamilyMembers] = useState([]);
  const [showFamilyForm, setShowFamilyForm] = useState(false);
  const [visaRefusals, setVisaRefusals] = useState([]);
  const [showVisaForm, setShowVisaForm] = useState(false);
  const [travelHistory, setTravelHistory] = useState([]);
  const [showTravelForm, setShowTravelForm] = useState(false);

  // Academic
  const [activeAcademicTab, setActiveAcademicTab] = useState('history');
  const [academicRecords, setAcademicRecords] = useState([]);
  const [showAcademicForm, setShowAcademicForm] = useState(false);
  const [publications, setPublications] = useState([]);
  const [showPublicationForm, setShowPublicationForm] = useState(false);
  const [certifications, setCertifications] = useState([]);
  const [showCertForm, setShowCertForm] = useState(false);

  // Study & Career
  const [activeStudyTab, setActiveStudyTab] = useState('study');
  const [studyPlan, setStudyPlan] = useState({
    country: '',
    city: '',
    university: '',
    programLevel: '',
    course: '',
    major: '',
    duration: 1,
    startDate: '',
    currency: 'USD',
    cost: '',
    notes: '',
  });
  const [careerPlan, setCareerPlan] = useState({
    shortTerm: '',
    longTerm: '',
    postStudy: '',
  });

  // Test Scores
  const [testScores, setTestScores] = useState([]);
  const [showTestModal, setShowTestModal] = useState(false);
  const [testForm, setTestForm] = useState({
    type: '',
    date: '',
    score: '',
    subScores: {},
    notes: '',
  });

  // Work Experience
  const [activeWorkTab, setActiveWorkTab] = useState('work');
  const [workExperiences, setWorkExperiences] = useState([]);
  const [showWorkForm, setShowWorkForm] = useState(false);
  const [activities, setActivities] = useState([]);
  const [showActivityForm, setShowActivityForm] = useState(false);

  // Financial
  const [activeFinancialTab, setActiveFinancialTab] = useState('sponsors');
  const [sponsors, setSponsors] = useState([]);
  const [showSponsorForm, setShowSponsorForm] = useState(false);
  const [assets, setAssets] = useState([]);
  const [showAssetForm, setShowAssetForm] = useState(false);
  const [scholarships, setScholarships] = useState([]);
  const [showScholarshipForm, setShowScholarshipForm] = useState(false);

  // Documents
  const [ds160File, setDs160File] = useState(null);
  const [i20File, setI20File] = useState(null);

  // Form State for additions
  const [familyForm, setFamilyForm] = useState({
    fullName: '',
    relationship: '',
    dob: '',
    nationality: '',
    occupation: '',
    phone: '',
    living: false,
  });
  const [visaForm, setVisaForm] = useState({
    type: '',
    country: '',
    date: '',
    reason: '',
  });
  const [travelForm, setTravelForm] = useState({
    country: '',
    purpose: '',
    entryDate: '',
    exitDate: '',
    refusedVisa: false,
  });
  const [academicForm, setAcademicForm] = useState({
    level: '',
    institution: '',
    major: '',
    startDate: '',
    endDate: '',
    currentlyStudying: false,
    gpa: '',
    gpaScale: '',
    achievements: '',
    recentInstitution: false,
  });
  const [publicationForm, setPublicationForm] = useState({
    title: '',
    type: '',
    year: '2026',
    description: '',
  });
  const [certForm, setCertForm] = useState({
    itemType: '',
    name: '',
    proficiency: '',
  });
  const [workForm, setWorkForm] = useState({
    type: '',
    company: '',
    role: '',
    currency: 'USD',
    salary: '',
    startDate: '',
    endDate: '',
    currentlyWorking: false,
    responsibilities: '',
    skillsGained: '',
  });
  const [activityForm, setActivityForm] = useState({
    name: '',
    role: '',
    startDate: '',
    endDate: '',
    currentlyInvolved: false,
    responsibilities: '',
  });
  const [sponsorForm, setSponsorForm] = useState({
    name: '',
    relationship: '',
    type: '',
    income: '',
    currency: 'USD',
    phone: '',
    email: '',
    address: '',
  });
  const [assetForm, setAssetForm] = useState({
    type: '',
    name: '',
    value: '',
    currency: 'USD',
    linkedSponsor: '',
    description: '',
  });
  const [scholarshipForm, setScholarshipForm] = useState({
    name: '',
    provider: '',
    type: '',
    amount: '',
    currency: 'USD',
    academicYear: '',
    status: '',
    description: '',
  });

  // Helper: Calculate progress
  const completedSections = [
    basicCompleted,
    academicRecords.length > 0,
    studyPlan.country && careerPlan.shortTerm,
    testScores.length > 0,
    workExperiences.length > 0,
    sponsors.length > 0,
  ].filter(Boolean).length;
  const progress = Math.round((completedSections / 6) * 100);

  // Reusable Components
  function TabCard({ icon: Icon, title, subtitle, active, onClick, showWarning, showSuccess }) {
    return (
      <div
        onClick={onClick}
        className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
          active
            ? 'border-2 border-indigo-600 bg-white'
            : 'border border-gray-200 bg-white hover:border-gray-300'
        }`}
      >
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
            active ? 'bg-indigo-600' : 'bg-indigo-100'
          }`}
        >
          <Icon className={`w-5 h-5 ${active ? 'text-white' : 'text-indigo-400'}`} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1">
            <span className="font-semibold text-sm text-gray-900">{title}</span>
            {showWarning && (
              <span className="w-4 h-4 rounded-full bg-yellow-400 flex items-center justify-center text-white text-xs">
                !
              </span>
            )}
            {showSuccess && (
              <CheckCircle className="w-4 h-4 text-green-500" />
            )}
          </div>
          <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
        </div>
      </div>
    );
  }

  function EmptyState({
    icon: Icon,
    title,
    description,
    buttonText,
    onButtonClick,
    iconBg = 'bg-indigo-50',
    iconColor = 'text-indigo-400',
    buttonClass = 'bg-indigo-600 hover:bg-indigo-700 text-white',
  }) {
    return (
      <div className="border border-gray-200 rounded-xl p-16 text-center">
        <div
          className={`w-16 h-16 rounded-full ${iconBg} flex items-center justify-center mx-auto mb-4`}
        >
          <Icon className={`w-8 h-8 ${iconColor}`} />
        </div>
        <h3 className="font-bold text-lg text-gray-900">{title}</h3>
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          {description}
        </p>
        <button
          onClick={onButtonClick}
          className={`mt-4 ${buttonClass} rounded-lg px-6 py-2.5 text-sm font-semibold flex items-center gap-2 mx-auto`}
        >
          <Plus className="w-4 h-4" /> {buttonText}
        </button>
      </div>
    );
  }

  function FormField({ label, icon: Icon, required, children }) {
    return (
      <div>
        <label className="text-sm font-medium text-gray-700 mb-1.5 flex items-center gap-1.5">
          {Icon && <Icon className="w-4 h-4 text-gray-400" />}
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
        {children}
      </div>
    );
  }

  const inputClass =
    'w-full border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent';

  function RecordCard({ title, subtitle, meta, onDelete }) {
    return (
      <div className="flex items-start justify-between p-4 border border-gray-200 rounded-xl bg-white mb-3">
        <div>
          <h4 className="font-semibold text-gray-900 text-sm">{title}</h4>
          <p className="text-xs text-gray-500 mt-0.5">{subtitle}</p>
          {meta && <p className="text-xs text-gray-400 mt-1">{meta}</p>}
        </div>
        <button
          onClick={onDelete}
          className="text-gray-400 hover:text-red-500 transition-colors ml-4 flex-shrink-0"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>
    );
  }

  // PAGES
  function OverviewPage() {
    return (
      <main className="flex-1 flex flex-col">
        <div className="bg-white border-b px-8 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Applicant Profile</h1>
            <p className="text-sm text-gray-500 mt-1">
              Complete your applicant profile for comprehensive visa guidance
            </p>
          </div>
          <svg width="80" height="80" viewBox="0 0 80 80" className="flex-shrink-0">
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="#E5E7EB"
              strokeWidth="6"
            />
            <circle
              cx="40"
              cy="40"
              r="34"
              fill="none"
              stroke="#4F46E5"
              strokeWidth="6"
              strokeDasharray={`${progress * 2.136} 213.6`}
              strokeLinecap="round"
              transform="rotate(-90 40 40)"
            />
            <text
              x="40"
              y="45"
              textAnchor="middle"
              className="text-sm font-bold fill-indigo-600"
            >
              {progress}%
            </text>
          </svg>
        </div>

        <div className="bg-gray-100 p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-200"
              onClick={() => setCurrentPage('basic')}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="flex items-center gap-1 text-xs text-orange-500">
                  <Clock className="w-3 h-3" />
                  {basicCompleted ? (
                    <span className="text-green-600">Completed</span>
                  ) : (
                    'Pending'
                  )}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-base mb-1">
                Basic Information
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Personal details, family & travel info
              </p>
              <button className="w-full py-2 rounded-lg text-sm font-semibold border-2 border-gray-800 text-gray-800 hover:bg-gray-50 transition-colors">
                Get Started
              </button>
            </div>

            <div
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${
                !basicCompleted ? 'opacity-60' : ''
              }`}
              onClick={() => basicCompleted && setCurrentPage('academic')}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <GraduationCap className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="flex items-center gap-1 text-xs text-orange-500">
                  <Clock className="w-3 h-3" />
                  {academicRecords.length > 0 ? (
                    <span className="text-green-600">Completed</span>
                  ) : (
                    'Pending'
                  )}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-base mb-1">
                Academic Background
              </h3>
              {!basicCompleted && (
                <p className="text-xs text-orange-500 mb-2 cursor-pointer">
                  Complete Basic Information to unlock
                </p>
              )}
              <p className="text-sm text-gray-500 mb-4">
                Education history & certifications
              </p>
              <button
                onClick={() => basicCompleted && setCurrentPage('academic')}
                disabled={!basicCompleted}
                className={`w-full py-2 rounded-lg text-sm font-semibold border-2 transition-colors ${
                  !basicCompleted
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-gray-800 text-gray-800 hover:bg-gray-50'
                }`}
              >
                Get Started
              </button>
            </div>

            <div
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${
                !basicCompleted ? 'opacity-60' : ''
              }`}
              onClick={() => basicCompleted && setCurrentPage('study')}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="flex items-center gap-1 text-xs text-orange-500">
                  <Clock className="w-3 h-3" />
                  {studyPlan.country && careerPlan.shortTerm ? (
                    <span className="text-green-600">Completed</span>
                  ) : (
                    'Pending'
                  )}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-base mb-1">
                Study & Career Plan
              </h3>
              {!basicCompleted && (
                <p className="text-xs text-orange-500 mb-2">
                  Complete Basic Information to unlock
                </p>
              )}
              <p className="text-sm text-gray-500 mb-4">
                Your study goals and career plans
              </p>
              <button
                onClick={() => basicCompleted && setCurrentPage('study')}
                disabled={!basicCompleted}
                className={`w-full py-2 rounded-lg text-sm font-semibold border-2 transition-colors ${
                  !basicCompleted
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-gray-800 text-gray-800 hover:bg-gray-50'
                }`}
              >
                Get Started
              </button>
            </div>

            <div
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${
                !basicCompleted ? 'opacity-60' : ''
              }`}
              onClick={() => basicCompleted && setCurrentPage('test')}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="flex items-center gap-1 text-xs text-orange-500">
                  <Clock className="w-3 h-3" />
                  {testScores.length > 0 ? (
                    <span className="text-green-600">Completed</span>
                  ) : (
                    'Pending'
                  )}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-base mb-1">
                Test Scores
              </h3>
              {!basicCompleted && (
                <p className="text-xs text-orange-500 mb-2">
                  Complete Basic Information to unlock
                </p>
              )}
              <p className="text-sm text-gray-500 mb-4">
                TOEFL, IELTS, SAT, GRE scores
              </p>
              <button
                onClick={() => basicCompleted && setCurrentPage('test')}
                disabled={!basicCompleted}
                className={`w-full py-2 rounded-lg text-sm font-semibold border-2 transition-colors ${
                  !basicCompleted
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-gray-800 text-gray-800 hover:bg-gray-50'
                }`}
              >
                Get Started
              </button>
            </div>

            <div
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${
                !basicCompleted ? 'opacity-60' : ''
              }`}
              onClick={() => basicCompleted && setCurrentPage('work')}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Briefcase className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="flex items-center gap-1 text-xs text-orange-500">
                  <Clock className="w-3 h-3" />
                  {workExperiences.length > 0 ? (
                    <span className="text-green-600">Completed</span>
                  ) : (
                    'Pending'
                  )}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-base mb-1">
                Work Experience
              </h3>
              {!basicCompleted && (
                <p className="text-xs text-orange-500 mb-2">
                  Complete Basic Information to unlock
                </p>
              )}
              <p className="text-sm text-gray-500 mb-4">
                Jobs and professional experience
              </p>
              <button
                onClick={() => basicCompleted && setCurrentPage('work')}
                disabled={!basicCompleted}
                className={`w-full py-2 rounded-lg text-sm font-semibold border-2 transition-colors ${
                  !basicCompleted
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-gray-800 text-gray-800 hover:bg-gray-50'
                }`}
              >
                Get Started
              </button>
            </div>

            <div
              className={`bg-white rounded-xl p-6 shadow-sm border border-gray-200 ${
                !basicCompleted ? 'opacity-60' : ''
              }`}
              onClick={() => basicCompleted && setCurrentPage('financial')}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-5 h-5 text-indigo-500" />
                </div>
                <div className="flex items-center gap-1 text-xs text-orange-500">
                  <Clock className="w-3 h-3" />
                  {sponsors.length > 0 ? (
                    <span className="text-green-600">Completed</span>
                  ) : (
                    'Pending'
                  )}
                </div>
              </div>
              <h3 className="font-semibold text-gray-900 text-base mb-1">
                Financial Details
              </h3>
              {!basicCompleted && (
                <p className="text-xs text-orange-500 mb-2">
                  Complete Basic Information to unlock
                </p>
              )}
              <p className="text-sm text-gray-500 mb-4">
                Sponsors and financial assets
              </p>
              <button
                onClick={() => basicCompleted && setCurrentPage('financial')}
                disabled={!basicCompleted}
                className={`w-full py-2 rounded-lg text-sm font-semibold border-2 transition-colors ${
                  !basicCompleted
                    ? 'border-gray-200 text-gray-300 cursor-not-allowed'
                    : 'border-gray-800 text-gray-800 hover:bg-gray-50'
                }`}
              >
                Get Started
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <Upload className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">DS-160 Form</h3>
                  <p className="text-xs text-gray-500">
                    Upload your completed DS-160 confirmation page
                  </p>
                </div>
              </div>
              <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => setDs160File(e.target.files[0])}
                />
                {ds160File ? (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{ds160File.name}</span>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Drop your PDF here or click to browse</p>
                    <p className="text-xs text-gray-400 mt-1">PDF only, max 5MB</p>
                  </>
                )}
              </label>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                  <FileText className="w-5 h-5 text-indigo-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">I-20 Form</h3>
                  <p className="text-xs text-gray-500">
                    Upload your I-20 form for US study
                  </p>
                </div>
              </div>
              <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-indigo-400 transition-colors">
                <input
                  type="file"
                  accept=".pdf"
                  className="hidden"
                  onChange={(e) => setI20File(e.target.files[0])}
                />
                {i20File ? (
                  <div className="flex items-center justify-center gap-2 text-green-600">
                    <CheckCircle className="w-5 h-5" />
                    <span className="text-sm font-medium">{i20File.name}</span>
                  </div>
                ) : (
                  <>
                    <UploadCloud className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-500">Drop your PDF here or click to browse</p>
                    <p className="text-xs text-gray-400 mt-1">PDF only, max 5MB</p>
                  </>
                )}
              </label>
            </div>
          </div>
        </div>
      </main>
    );
  }

  function BasicPage() {
    return (
      <main className="flex-1 flex flex-col">
        <div className="bg-white border-b px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => setCurrentPage('overview')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Basic Information</h1>
            <p className="text-sm text-gray-500">
              Personal details, family, visa refusals & travel history
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-4 gap-4 mb-6">
            <TabCard
              icon={User}
              title="Personal Details"
              subtitle="Your basic info"
              active={activeBasicTab === 'personal'}
              onClick={() => setActiveBasicTab('personal')}
              showSuccess={personalDetails.fullName !== ''}
            />
            <TabCard
              icon={Users}
              title="Family Members"
              subtitle="Family info"
              active={activeBasicTab === 'family'}
              onClick={() => setActiveBasicTab('family')}
              showWarning={familyMembers.length === 0}
            />
            <TabCard
              icon={FileText}
              title="Visa Refusals"
              subtitle="Previous refusals"
              active={activeBasicTab === 'visa'}
              onClick={() => setActiveBasicTab('visa')}
              showWarning={visaRefusals.length === 0}
            />
            <TabCard
              icon={MapPin}
              title="Travel History"
              subtitle="Travel details"
              active={activeBasicTab === 'travel'}
              onClick={() => setActiveBasicTab('travel')}
            />
          </div>

          {activeBasicTab === 'personal' && (
            <div>
              <div className="bg-white rounded-xl p-6 mb-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">Personal Details</h3>
                    <p className="text-xs text-gray-500">
                      Provide your personal information
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  <FormField label="Full Name" icon={User} required>
                    <input
                      type="text"
                      className={inputClass}
                      value={personalDetails.fullName}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          fullName: e.target.value,
                        })
                      }
                    />
                  </FormField>
                  <FormField label="Date of Birth" icon={Calendar} required>
                    <input
                      type="date"
                      className={inputClass}
                      value={personalDetails.dob}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          dob: e.target.value,
                        })
                      }
                    />
                  </FormField>
                  <FormField label="Gender" icon={User} required>
                    <select
                      className={inputClass}
                      value={personalDetails.gender}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          gender: e.target.value,
                        })
                      }
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                      <option>Prefer not to say</option>
                    </select>
                  </FormField>
                  <FormField label="Nationality" icon={Globe} required>
                    <input
                      type="text"
                      className={inputClass}
                      value={personalDetails.nationality}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          nationality: e.target.value,
                        })
                      }
                    />
                  </FormField>
                  <FormField label="Marital Status" required>
                    <select
                      className={inputClass}
                      value={personalDetails.maritalStatus}
                      onChange={(e) =>
                        setPersonalDetails({
                          ...personalDetails,
                          maritalStatus: e.target.value,
                        })
                      }
                    >
                      <option value="">Select status</option>
                      <option>Single</option>
                      <option>Married</option>
                      <option>Divorced</option>
                      <option>Widowed</option>
                    </select>
                  </FormField>
                </div>

                <div className="border-t pt-4 flex justify-between">
                  <button className="flex items-center gap-2 px-4 py-2 border-2 border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50">
                    Save Profile
                  </button>
                  <button
                    onClick={() => {
                      setBasicCompleted(true);
                      setActiveBasicTab('family');
                    }}
                    className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                  >
                    Next Form <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeBasicTab === 'family' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Family Members</h3>
                <button
                  onClick={() => setShowFamilyForm(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4" /> Add Family Member
                </button>
              </div>

              {showFamilyForm && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Add Family Member</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <FormField label="Full Name" icon={User} required>
                      <input
                        type="text"
                        className={inputClass}
                        value={familyForm.fullName}
                        onChange={(e) =>
                          setFamilyForm({ ...familyForm, fullName: e.target.value })
                        }
                      />
                    </FormField>
                    <FormField label="Relationship" icon={Users} required>
                      <select
                        className={inputClass}
                        value={familyForm.relationship}
                        onChange={(e) =>
                          setFamilyForm({
                            ...familyForm,
                            relationship: e.target.value,
                          })
                        }
                      >
                        <option value="">Select relationship</option>
                        <option>Father</option>
                        <option>Mother</option>
                        <option>Spouse</option>
                        <option>Sibling</option>
                        <option>Child</option>
                        <option>Other</option>
                      </select>
                    </FormField>
                    <FormField label="Date of Birth" icon={Calendar} required>
                      <input
                        type="date"
                        className={inputClass}
                        value={familyForm.dob}
                        onChange={(e) =>
                          setFamilyForm({ ...familyForm, dob: e.target.value })
                        }
                      />
                    </FormField>
                    <FormField label="Nationality" icon={Globe} required>
                      <input
                        type="text"
                        className={inputClass}
                        value={familyForm.nationality}
                        onChange={(e) =>
                          setFamilyForm({ ...familyForm, nationality: e.target.value })
                        }
                      />
                    </FormField>
                    <FormField label="Occupation" icon={Briefcase} required>
                      <input
                        type="text"
                        className={inputClass}
                        value={familyForm.occupation}
                        onChange={(e) =>
                          setFamilyForm({ ...familyForm, occupation: e.target.value })
                        }
                      />
                    </FormField>
                    <FormField label="Phone Number" icon={Phone}>
                      <input
                        type="tel"
                        className={inputClass}
                        value={familyForm.phone}
                        onChange={(e) =>
                          setFamilyForm({ ...familyForm, phone: e.target.value })
                        }
                      />
                    </FormField>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      id="family-living"
                      checked={familyForm.living}
                      onChange={(e) =>
                        setFamilyForm({ ...familyForm, living: e.target.checked })
                      }
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="family-living" className="text-sm text-gray-700">
                      Currently living with me
                    </label>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowFamilyForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (
                          familyForm.fullName &&
                          familyForm.relationship &&
                          familyForm.dob &&
                          familyForm.nationality
                        ) {
                          setFamilyMembers([...familyMembers, { ...familyForm }]);
                          setFamilyForm({
                            fullName: '',
                            relationship: '',
                            dob: '',
                            nationality: '',
                            occupation: '',
                            phone: '',
                            living: false,
                          });
                          setShowFamilyForm(false);
                        }
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                    >
                      Add Family Member
                    </button>
                  </div>
                </div>
              )}

              {familyMembers.length === 0 && !showFamilyForm ? (
                <EmptyState
                  icon={Users}
                  title="No Family Members Added"
                  description="Add your family members to complete this section"
                  buttonText="Add Family Member"
                  onButtonClick={() => setShowFamilyForm(true)}
                />
              ) : (
                familyMembers.map((member, idx) => (
                  <RecordCard
                    key={idx}
                    title={member.fullName}
                    subtitle={member.relationship}
                    meta={`${member.nationality} • ${member.occupation}`}
                    onDelete={() =>
                      setFamilyMembers(familyMembers.filter((_, i) => i !== idx))
                    }
                  />
                ))
              )}
            </div>
          )}

          {activeBasicTab === 'visa' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">Previous Visa Refusals</h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Please add all previous visa refusals
                  </p>
                </div>
                <button
                  onClick={() => setShowVisaForm(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700"
                >
                  <Plus className="w-4 h-4" /> Add Refusal
                </button>
              </div>

              {showVisaForm && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-red-600" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Add Visa Refusal</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <FormField label="Visa Type" icon={FileText} required>
                      <select
                        className={inputClass}
                        value={visaForm.type}
                        onChange={(e) =>
                          setVisaForm({ ...visaForm, type: e.target.value })
                        }
                      >
                        <option value="">Select visa type</option>
                        <option>F1</option>
                        <option>B1-B2</option>
                        <option>H1B</option>
                        <option>J1</option>
                        <option>Other</option>
                      </select>
                    </FormField>
                    <FormField label="Country of Application" icon={Globe} required>
                      <input
                        type="text"
                        className={inputClass}
                        value={visaForm.country}
                        onChange={(e) =>
                          setVisaForm({ ...visaForm, country: e.target.value })
                        }
                      />
                    </FormField>
                  </div>

                  <FormField label="Refusal Date" icon={Calendar} required>
                    <input
                      type="date"
                      className={inputClass}
                      value={visaForm.date}
                      onChange={(e) =>
                        setVisaForm({ ...visaForm, date: e.target.value })
                      }
                    />
                  </FormField>

                  <FormField label="Refusal Reason" icon={AlignLeft} required>
                    <textarea
                      rows="3"
                      className={inputClass}
                      value={visaForm.reason}
                      onChange={(e) =>
                        setVisaForm({ ...visaForm, reason: e.target.value })
                      }
                    />
                  </FormField>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setShowVisaForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (visaForm.type && visaForm.country && visaForm.date) {
                          setVisaRefusals([...visaRefusals, { ...visaForm }]);
                          setVisaForm({ type: '', country: '', date: '', reason: '' });
                          setShowVisaForm(false);
                        }
                      }}
                      className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-semibold hover:bg-red-700"
                    >
                      Add Refusal
                    </button>
                  </div>
                </div>
              )}

              {visaRefusals.length === 0 && !showVisaForm ? (
                <EmptyState
                  icon={FileText}
                  title="No Visa Refusals Added"
                  description="Add your visa refusal history if applicable"
                  buttonText="Add Refusal"
                  onButtonClick={() => setShowVisaForm(true)}
                  iconBg="bg-red-50"
                  iconColor="text-red-400"
                  buttonClass="bg-red-600 hover:bg-red-700 text-white"
                />
              ) : (
                visaRefusals.map((refusal, idx) => (
                  <RecordCard
                    key={idx}
                    title={refusal.type}
                    subtitle={refusal.country}
                    meta={refusal.date}
                    onDelete={() =>
                      setVisaRefusals(visaRefusals.filter((_, i) => i !== idx))
                    }
                  />
                ))
              )}
            </div>
          )}

          {activeBasicTab === 'travel' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Travel History</h3>
                <button
                  onClick={() => setShowTravelForm(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4" /> Add Travel History
                </button>
              </div>

              {showTravelForm && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <h4 className="font-semibold text-gray-900">Add Travel History</h4>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <FormField label="Country Visited" icon={Globe} required>
                      <input
                        type="text"
                        className={inputClass}
                        value={travelForm.country}
                        onChange={(e) =>
                          setTravelForm({ ...travelForm, country: e.target.value })
                        }
                      />
                    </FormField>
                    <FormField label="Purpose of Visit" icon={FileText} required>
                      <select
                        className={inputClass}
                        value={travelForm.purpose}
                        onChange={(e) =>
                          setTravelForm({ ...travelForm, purpose: e.target.value })
                        }
                      >
                        <option value="">Select purpose</option>
                        <option>Tourism</option>
                        <option>Business</option>
                        <option>Education</option>
                        <option>Medical</option>
                        <option>Other</option>
                      </select>
                    </FormField>
                    <FormField label="Entry Date" icon={Calendar} required>
                      <input
                        type="date"
                        className={inputClass}
                        value={travelForm.entryDate}
                        onChange={(e) =>
                          setTravelForm({ ...travelForm, entryDate: e.target.value })
                        }
                      />
                    </FormField>
                    <FormField label="Exit Date" icon={Calendar}>
                      <input
                        type="date"
                        className={inputClass}
                        value={travelForm.exitDate}
                        onChange={(e) =>
                          setTravelForm({ ...travelForm, exitDate: e.target.value })
                        }
                      />
                    </FormField>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      id="travel-refusal"
                      checked={travelForm.refusedVisa}
                      onChange={(e) =>
                        setTravelForm({ ...travelForm, refusedVisa: e.target.checked })
                      }
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="travel-refusal" className="text-sm text-gray-700">
                      Visa refused during this trip
                    </label>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowTravelForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (
                          travelForm.country &&
                          travelForm.purpose &&
                          travelForm.entryDate
                        ) {
                          setTravelHistory([...travelHistory, { ...travelForm }]);
                          setTravelForm({
                            country: '',
                            purpose: '',
                            entryDate: '',
                            exitDate: '',
                            refusedVisa: false,
                          });
                          setShowTravelForm(false);
                        }
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                    >
                      Add Travel History
                    </button>
                  </div>
                </div>
              )}

              {travelHistory.length === 0 && !showTravelForm ? (
                <EmptyState
                  icon={MapPin}
                  title="No Travel History Added"
                  description="Add your travel history to complete this section"
                  buttonText="Add Travel History"
                  onButtonClick={() => setShowTravelForm(true)}
                />
              ) : (
                travelHistory.map((travel, idx) => (
                  <RecordCard
                    key={idx}
                    title={travel.country}
                    subtitle={travel.purpose}
                    meta={`${travel.entryDate} to ${travel.exitDate || 'Present'}`}
                    onDelete={() =>
                      setTravelHistory(travelHistory.filter((_, i) => i !== idx))
                    }
                  />
                ))
              )}
            </div>
          )}

          <div className="flex justify-between mt-6 bg-white p-4 rounded-lg">
            <button
              onClick={() => setCurrentPage('overview')}
              className="text-gray-700 font-semibold"
            >
              ← Back
            </button>
            <button
              onClick={() => setCurrentPage('academic')}
              className="text-gray-700 font-semibold"
            >
              Next Form →
            </button>
          </div>
        </div>
      </main>
    );
  }

  function AcademicPage() {
    return (
      <main className="flex-1 flex flex-col">
        <div className="bg-white border-b px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => setCurrentPage('basic')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Academic Background</h1>
            <p className="text-sm text-gray-500">
              Education history, research, and certifications
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <TabCard
              icon={FileText}
              title="Academic History"
              subtitle="Education records"
              active={activeAcademicTab === 'history'}
              onClick={() => setActiveAcademicTab('history')}
              showWarning={academicRecords.length === 0}
            />
            <TabCard
              icon={BookOpen}
              title="Research & Publications"
              subtitle="Published work"
              active={activeAcademicTab === 'publications'}
              onClick={() => setActiveAcademicTab('publications')}
            />
            <TabCard
              icon={CheckCircle}
              title="Skill Certifications"
              subtitle="Skills & certificates"
              active={activeAcademicTab === 'certifications'}
              onClick={() => setActiveAcademicTab('certifications')}
            />
          </div>

          {activeAcademicTab === 'history' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Academic History</h3>
                <button
                  onClick={() => setShowAcademicForm(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4" /> Add Academic Record
                </button>
              </div>

              {showAcademicForm && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                      <GraduationCap className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Add New Academic Record
                      </h4>
                      <p className="text-xs text-gray-500">
                        Please provide details about your academic background
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <FormField label="Education Level" icon={GraduationCap} required>
                      <select
                        className={inputClass}
                        value={academicForm.level}
                        onChange={(e) =>
                          setAcademicForm({ ...academicForm, level: e.target.value })
                        }
                      >
                        <option value="">Select education level</option>
                        <option>High School</option>
                        <option>Bachelor's</option>
                        <option>Master's</option>
                        <option>PhD</option>
                        <option>Diploma</option>
                        <option>Certificate</option>
                        <option>Associate</option>
                      </select>
                    </FormField>
                    <FormField label="Institution Name" icon={Building} required>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="Enter institution name"
                        value={academicForm.institution}
                        onChange={(e) =>
                          setAcademicForm({
                            ...academicForm,
                            institution: e.target.value,
                          })
                        }
                      />
                    </FormField>
                    <FormField label="Major/Course" icon={BookOpen} required>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="Enter major or course"
                        value={academicForm.major}
                        onChange={(e) =>
                          setAcademicForm({ ...academicForm, major: e.target.value })
                        }
                      />
                    </FormField>
                    <FormField label="Start Date" icon={Calendar} required>
                      <input
                        type="date"
                        className={inputClass}
                        value={academicForm.startDate}
                        onChange={(e) =>
                          setAcademicForm({
                            ...academicForm,
                            startDate: e.target.value,
                          })
                        }
                      />
                    </FormField>
                    <FormField label="End Date" icon={Calendar} required>
                      <input
                        type="date"
                        className={inputClass}
                        disabled={academicForm.currentlyStudying}
                        value={academicForm.endDate}
                        onChange={(e) =>
                          setAcademicForm({
                            ...academicForm,
                            endDate: e.target.value,
                          })
                        }
                      />
                    </FormField>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="currently-studying"
                        checked={academicForm.currentlyStudying}
                        onChange={(e) =>
                          setAcademicForm({
                            ...academicForm,
                            currentlyStudying: e.target.checked,
                          })
                        }
                        className="rounded border-gray-300"
                      />
                      <label
                        htmlFor="currently-studying"
                        className="text-sm text-gray-700"
                      >
                        Currently studying here
                      </label>
                    </div>
                    <FormField label="GPA/Grades" icon={BarChart2} required>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="Enter GPA or grades"
                        value={academicForm.gpa}
                        onChange={(e) =>
                          setAcademicForm({ ...academicForm, gpa: e.target.value })
                        }
                      />
                    </FormField>
                    <FormField label="GPA Scale" icon={BarChart2} required>
                      <select
                        className={inputClass}
                        value={academicForm.gpaScale}
                        onChange={(e) =>
                          setAcademicForm({
                            ...academicForm,
                            gpaScale: e.target.value,
                          })
                        }
                      >
                        <option value="">Select GPA scale</option>
                        <option>4.0</option>
                        <option>5.0</option>
                        <option>10.0</option>
                        <option>Percentage</option>
                        <option>Grade Letters</option>
                      </select>
                    </FormField>
                  </div>

                  <FormField label="Achievements/Awards" icon={Star} required>
                    <textarea
                      rows="3"
                      className={inputClass}
                      placeholder="Enter achievements and awards"
                      value={academicForm.achievements}
                      onChange={(e) =>
                        setAcademicForm({
                          ...academicForm,
                          achievements: e.target.value,
                        })
                      }
                    />
                  </FormField>

                  <div className="flex items-center gap-2 mt-4 mb-4">
                    <input
                      type="checkbox"
                      id="recent-institution"
                      checked={academicForm.recentInstitution}
                      onChange={(e) =>
                        setAcademicForm({
                          ...academicForm,
                          recentInstitution: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="recent-institution" className="text-sm text-gray-700">
                      This is my recent academic institution
                    </label>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowAcademicForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (
                          academicForm.level &&
                          academicForm.institution &&
                          academicForm.major
                        ) {
                          setAcademicRecords([...academicRecords, { ...academicForm }]);
                          setAcademicForm({
                            level: '',
                            institution: '',
                            major: '',
                            startDate: '',
                            endDate: '',
                            currentlyStudying: false,
                            gpa: '',
                            gpaScale: '',
                            achievements: '',
                            recentInstitution: false,
                          });
                          setShowAcademicForm(false);
                        }
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                    >
                      Add Academic Record
                    </button>
                  </div>
                </div>
              )}

              {academicRecords.length === 0 && !showAcademicForm ? (
                <EmptyState
                  icon={GraduationCap}
                  title="No Academic Records Added"
                  description="Add your academic history to complete your educational background"
                  buttonText="Add Academic Record"
                  onButtonClick={() => setShowAcademicForm(true)}
                />
              ) : (
                academicRecords.map((record, idx) => (
                  <RecordCard
                    key={idx}
                    title={record.institution}
                    subtitle={`${record.level} in ${record.major}`}
                    meta={`${record.startDate} to ${record.endDate || 'Present'}`}
                    onDelete={() =>
                      setAcademicRecords(academicRecords.filter((_, i) => i !== idx))
                    }
                  />
                ))
              )}
            </div>
          )}

          {activeAcademicTab === 'publications' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Research Publications</h3>
                <button
                  onClick={() => setShowPublicationForm(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4" /> Add Publication
                </button>
              </div>

              {showPublicationForm && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Add New Research Publication
                      </h4>
                      <p className="text-xs text-gray-500">
                        Please provide details about your research work
                      </p>
                    </div>
                  </div>

                  <FormField label="Title" icon={FileText} required>
                    <input
                      type="text"
                      className={inputClass}
                      placeholder="Enter publication title"
                      value={publicationForm.title}
                      onChange={(e) =>
                        setPublicationForm({
                          ...publicationForm,
                          title: e.target.value,
                        })
                      }
                    />
                  </FormField>

                  <FormField label="Research Type" icon={BookOpen} required>
                    <select
                      className={inputClass}
                      value={publicationForm.type}
                      onChange={(e) =>
                        setPublicationForm({
                          ...publicationForm,
                          type: e.target.value,
                        })
                      }
                    >
                      <option value="">Select research type</option>
                      <option>Journal Article</option>
                      <option>Conference Paper</option>
                      <option>Thesis</option>
                      <option>Book Chapter</option>
                      <option>Technical Report</option>
                      <option>Other</option>
                    </select>
                  </FormField>

                  <FormField label="Published Year" icon={Calendar} required>
                    <select
                      className={inputClass}
                      value={publicationForm.year}
                      onChange={(e) =>
                        setPublicationForm({
                          ...publicationForm,
                          year: e.target.value,
                        })
                      }
                    >
                      {Array.from(
                        { length: 37 },
                        (_, i) => 2026 - i
                      ).map((year) => (
                        <option key={year} value={year}>
                          {year}
                        </option>
                      ))}
                    </select>
                  </FormField>

                  <FormField label="Brief Description" icon={AlignLeft} required>
                    <textarea
                      rows="3"
                      className={inputClass}
                      placeholder="Enter brief description of the publication"
                      value={publicationForm.description}
                      onChange={(e) =>
                        setPublicationForm({
                          ...publicationForm,
                          description: e.target.value,
                        })
                      }
                    />
                  </FormField>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setShowPublicationForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (
                          publicationForm.title &&
                          publicationForm.type &&
                          publicationForm.year
                        ) {
                          setPublications([...publications, { ...publicationForm }]);
                          setPublicationForm({
                            title: '',
                            type: '',
                            year: '2026',
                            description: '',
                          });
                          setShowPublicationForm(false);
                        }
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                    >
                      Add Publication
                    </button>
                  </div>
                </div>
              )}

              {publications.length === 0 && !showPublicationForm ? (
                <EmptyState
                  icon={BookOpen}
                  title="No Publications Added"
                  description="Add your research publications to complete this section"
                  buttonText="Add Publication"
                  onButtonClick={() => setShowPublicationForm(true)}
                />
              ) : (
                publications.map((pub, idx) => (
                  <RecordCard
                    key={idx}
                    title={pub.title}
                    subtitle={pub.type}
                    meta={`Published: ${pub.year}`}
                    onDelete={() =>
                      setPublications(publications.filter((_, i) => i !== idx))
                    }
                  />
                ))
              )}
            </div>
          )}

          {activeAcademicTab === 'certifications' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Skill Certifications</h3>
                <button
                  onClick={() => setShowCertForm(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4" /> Add Certification
                </button>
              </div>

              {showCertForm && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Add New Skill Certification
                      </h4>
                      <p className="text-xs text-gray-500">
                        Please provide details about your skills and certifications
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <FormField label="Item Type" icon={Tag} required>
                      <select
                        className={inputClass}
                        value={certForm.itemType}
                        onChange={(e) =>
                          setCertForm({ ...certForm, itemType: e.target.value })
                        }
                      >
                        <option value="">Select item type</option>
                        <option>Technical Skill</option>
                        <option>Language</option>
                        <option>Professional Certification</option>
                        <option>Online Course</option>
                        <option>Workshop</option>
                        <option>Other</option>
                      </select>
                    </FormField>
                    <FormField label="Name" icon={User} required>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="Enter skill or certification name"
                        value={certForm.name}
                        onChange={(e) =>
                          setCertForm({ ...certForm, name: e.target.value })
                        }
                      />
                    </FormField>
                    <FormField label="Proficiency Level" icon={Zap} required>
                      <select
                        className={inputClass}
                        value={certForm.proficiency}
                        onChange={(e) =>
                          setCertForm({ ...certForm, proficiency: e.target.value })
                        }
                      >
                        <option value="">Select proficiency level</option>
                        <option>Beginner</option>
                        <option>Intermediate</option>
                        <option>Advanced</option>
                        <option>Expert</option>
                        <option>Native</option>
                      </select>
                    </FormField>
                  </div>

                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => setShowCertForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (certForm.itemType && certForm.name && certForm.proficiency) {
                          setCertifications([...certifications, { ...certForm }]);
                          setCertForm({
                            itemType: '',
                            name: '',
                            proficiency: '',
                          });
                          setShowCertForm(false);
                        }
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                    >
                      Add Certification
                    </button>
                  </div>
                </div>
              )}

              {certifications.length === 0 && !showCertForm ? (
                <EmptyState
                  icon={CheckCircle}
                  title="No Certifications Added"
                  description="Add your skill certifications to complete this section"
                  buttonText="Add Certification"
                  onButtonClick={() => setShowCertForm(true)}
                />
              ) : (
                certifications.map((cert, idx) => (
                  <RecordCard
                    key={idx}
                    title={cert.name}
                    subtitle={cert.itemType}
                    meta={`Level: ${cert.proficiency}`}
                    onDelete={() =>
                      setCertifications(certifications.filter((_, i) => i !== idx))
                    }
                  />
                ))
              )}
            </div>
          )}

          <div className="flex justify-between mt-6 bg-white p-4 rounded-lg">
            <button
              onClick={() => setCurrentPage('basic')}
              className="text-gray-700 font-semibold"
            >
              ← Back
            </button>
            <button
              onClick={() => setCurrentPage('study')}
              className="text-gray-700 font-semibold"
            >
              Next Form →
            </button>
          </div>
        </div>
      </main>
    );
  }

  function StudyPage() {
    return (
      <main className="flex-1 flex flex-col">
        <div className="bg-white border-b px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => setCurrentPage('academic')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Study & Career Plan</h1>
            <p className="text-sm text-gray-500">Your study goals and career plans</p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <TabCard
              icon={BookOpen}
              title="Study Plan"
              subtitle="Study destination"
              active={activeStudyTab === 'study'}
              onClick={() => setActiveStudyTab('study')}
              showWarning={!studyPlan.country}
            />
            <TabCard
              icon={Briefcase}
              title="Career Plan"
              subtitle="Career goals"
              active={activeStudyTab === 'career'}
              onClick={() => setActiveStudyTab('career')}
              showWarning={!careerPlan.shortTerm}
            />
          </div>

          {activeStudyTab === 'study' && (
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4 pb-4 border-b">
                Study Plan
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <FormField label="Country of Study" icon={Globe} required>
                  <select
                    className={inputClass}
                    value={studyPlan.country}
                    onChange={(e) =>
                      setStudyPlan({ ...studyPlan, country: e.target.value })
                    }
                  >
                    <option value="">Select country</option>
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Canada</option>
                    <option>Australia</option>
                    <option>Germany</option>
                    <option>France</option>
                    <option>Japan</option>
                    <option>South Korea</option>
                    <option>Netherlands</option>
                    <option>Sweden</option>
                    <option>New Zealand</option>
                    <option>Other</option>
                  </select>
                </FormField>
                <FormField label="State/City" icon={MapPin} required>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Enter state or city"
                    value={studyPlan.city}
                    onChange={(e) =>
                      setStudyPlan({ ...studyPlan, city: e.target.value })
                    }
                  />
                </FormField>
                <FormField label="University Name" icon={Building} required>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Enter university name"
                    value={studyPlan.university}
                    onChange={(e) =>
                      setStudyPlan({ ...studyPlan, university: e.target.value })
                    }
                  />
                </FormField>
                <FormField label="Program Level" icon={GraduationCap} required>
                  <select
                    className={inputClass}
                    value={studyPlan.programLevel}
                    onChange={(e) =>
                      setStudyPlan({ ...studyPlan, programLevel: e.target.value })
                    }
                  >
                    <option value="">Select level</option>
                    <option>Bachelor's</option>
                    <option>Master's</option>
                    <option>PhD</option>
                    <option>Associate</option>
                    <option>Certificate</option>
                    <option>Diploma</option>
                  </select>
                </FormField>
                <FormField label="Course Name" icon={BookOpen} required>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Enter course name"
                    value={studyPlan.course}
                    onChange={(e) =>
                      setStudyPlan({ ...studyPlan, course: e.target.value })
                    }
                  />
                </FormField>
                <FormField label="Major/Specialization" icon={Users} required>
                  <input
                    type="text"
                    className={inputClass}
                    placeholder="Enter major or specialization"
                    value={studyPlan.major}
                    onChange={(e) =>
                      setStudyPlan({ ...studyPlan, major: e.target.value })
                    }
                  />
                </FormField>
                <FormField label="Program Duration (Years)" icon={Clock} required>
                  <input
                    type="number"
                    min="1"
                    max="10"
                    className={inputClass}
                    value={studyPlan.duration}
                    onChange={(e) =>
                      setStudyPlan({
                        ...studyPlan,
                        duration: parseInt(e.target.value),
                      })
                    }
                  />
                </FormField>
                <FormField label="Program Start Date" icon={Calendar} required>
                  <input
                    type="date"
                    className={inputClass}
                    value={studyPlan.startDate}
                    onChange={(e) =>
                      setStudyPlan({ ...studyPlan, startDate: e.target.value })
                    }
                  />
                </FormField>
                <FormField label="Currency" icon={DollarSign} required>
                  <select
                    className={inputClass}
                    value={studyPlan.currency}
                    onChange={(e) =>
                      setStudyPlan({ ...studyPlan, currency: e.target.value })
                    }
                  >
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                    <option>CAD</option>
                    <option>AUD</option>
                  </select>
                </FormField>
                <FormField label="Cost of Attendance" icon={DollarSign} required>
                  <input
                    type="number"
                    className={inputClass}
                    placeholder="Enter total cost"
                    value={studyPlan.cost}
                    onChange={(e) =>
                      setStudyPlan({ ...studyPlan, cost: e.target.value })
                    }
                  />
                </FormField>
              </div>

              <FormField label="Any other information?" icon={AlignLeft}>
                <textarea
                  rows="3"
                  className={inputClass}
                  value={studyPlan.notes}
                  onChange={(e) =>
                    setStudyPlan({ ...studyPlan, notes: e.target.value })
                  }
                />
              </FormField>

              <div className="flex justify-between mt-6 pt-4 border-t">
                <button
                  onClick={() => setCurrentPage('academic')}
                  className="text-gray-700 font-semibold"
                >
                  ← Back
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">
                  Save Study Plan
                </button>
              </div>
            </div>
          )}

          {activeStudyTab === 'career' && (
            <div className="bg-white rounded-xl p-6">
              <h3 className="font-semibold text-gray-900 mb-4 pb-4 border-b">
                Career Plan
              </h3>

              <FormField
                label="Short Term Career Plan"
                icon={FileText}
                required
              >
                <textarea
                  rows="4"
                  className={inputClass}
                  placeholder="Describe your short-term career goals (1-3 years)"
                  value={careerPlan.shortTerm}
                  onChange={(e) =>
                    setCareerPlan({ ...careerPlan, shortTerm: e.target.value })
                  }
                />
              </FormField>

              <FormField label="Long Term Career Plan" icon={FileText} required>
                <textarea
                  rows="4"
                  className={inputClass}
                  placeholder="Describe your long-term career goals (5-10 years)"
                  value={careerPlan.longTerm}
                  onChange={(e) =>
                    setCareerPlan({ ...careerPlan, longTerm: e.target.value })
                  }
                />
              </FormField>

              <FormField label="Post Study Intentions" icon={FileText} required>
                <textarea
                  rows="4"
                  className={inputClass}
                  placeholder="Describe your intentions after completing your studies"
                  value={careerPlan.postStudy}
                  onChange={(e) =>
                    setCareerPlan({ ...careerPlan, postStudy: e.target.value })
                  }
                />
              </FormField>

              <div className="flex justify-between mt-6 pt-4 border-t">
                <button
                  onClick={() => setCurrentPage('academic')}
                  className="text-gray-700 font-semibold"
                >
                  ← Back
                </button>
                <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700">
                  Save Career Plan
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    );
  }

  function TestScoresPage() {
    return (
      <main className="flex-1 flex flex-col">
        <div className="bg-white border-b px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => setCurrentPage('study')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Test Scores</h1>
            <p className="text-sm text-gray-500">TOEFL, IELTS, SAT, GRE, and other test scores</p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 flex-1 overflow-y-auto">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-gray-900">Test Scores</h3>
            <button
              onClick={() => setShowTestModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
            >
              <Plus className="w-4 h-4" /> Add Test Score
            </button>
          </div>

          {testScores.length === 0 ? (
            <EmptyState
              icon={FileText}
              title="No Test Scores Added"
              description="Add your standardized test scores"
              buttonText="Add Test Score"
              onButtonClick={() => setShowTestModal(true)}
            />
          ) : (
            testScores.map((test, idx) => (
              <RecordCard
                key={idx}
                title={test.type}
                subtitle={`Score: ${test.score}`}
                meta={test.date}
                onDelete={() =>
                  setTestScores(testScores.filter((_, i) => i !== idx))
                }
              />
            ))
          )}

          {showTestModal && (
            <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl mx-4">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-bold text-gray-900">Add Test Score</h2>
                  <button
                    onClick={() => setShowTestModal(false)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  <FormField label="Test Type" icon={FileText} required>
                    <select
                      className={inputClass}
                      value={testForm.type}
                      onChange={(e) =>
                        setTestForm({ ...testForm, type: e.target.value })
                      }
                    >
                      <option value="">Select test type</option>
                      <option>TOEFL</option>
                      <option>IELTS</option>
                      <option>SAT</option>
                      <option>GRE</option>
                      <option>GMAT</option>
                      <option>Duolingo English Test</option>
                      <option>PTE</option>
                      <option>TOEIC</option>
                      <option>Other</option>
                    </select>
                  </FormField>

                  <FormField label="Test Date" icon={Calendar} required>
                    <input
                      type="date"
                      className={inputClass}
                      value={testForm.date}
                      onChange={(e) =>
                        setTestForm({ ...testForm, date: e.target.value })
                      }
                    />
                  </FormField>

                  <FormField label="Overall Score" required>
                    <input
                      type="number"
                      className={inputClass}
                      value={testForm.score}
                      onChange={(e) =>
                        setTestForm({ ...testForm, score: e.target.value })
                      }
                    />
                  </FormField>

                  {testForm.type === 'IELTS' && (
                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                      <FormField label="Listening" required>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="9"
                          className={inputClass}
                          value={testForm.subScores.listening || ''}
                          onChange={(e) =>
                            setTestForm({
                              ...testForm,
                              subScores: {
                                ...testForm.subScores,
                                listening: e.target.value,
                              },
                            })
                          }
                        />
                      </FormField>
                      <FormField label="Reading" required>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="9"
                          className={inputClass}
                          value={testForm.subScores.reading || ''}
                          onChange={(e) =>
                            setTestForm({
                              ...testForm,
                              subScores: {
                                ...testForm.subScores,
                                reading: e.target.value,
                              },
                            })
                          }
                        />
                      </FormField>
                      <FormField label="Writing" required>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="9"
                          className={inputClass}
                          value={testForm.subScores.writing || ''}
                          onChange={(e) =>
                            setTestForm({
                              ...testForm,
                              subScores: {
                                ...testForm.subScores,
                                writing: e.target.value,
                              },
                            })
                          }
                        />
                      </FormField>
                      <FormField label="Speaking" required>
                        <input
                          type="number"
                          step="0.5"
                          min="0"
                          max="9"
                          className={inputClass}
                          value={testForm.subScores.speaking || ''}
                          onChange={(e) =>
                            setTestForm({
                              ...testForm,
                              subScores: {
                                ...testForm.subScores,
                                speaking: e.target.value,
                              },
                            })
                          }
                        />
                      </FormField>
                    </div>
                  )}

                  {testForm.type === 'TOEFL' && (
                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                      <FormField label="Reading (0-30)" required>
                        <input
                          type="number"
                          min="0"
                          max="30"
                          className={inputClass}
                          value={testForm.subScores.reading || ''}
                          onChange={(e) =>
                            setTestForm({
                              ...testForm,
                              subScores: {
                                ...testForm.subScores,
                                reading: e.target.value,
                              },
                            })
                          }
                        />
                      </FormField>
                      <FormField label="Listening (0-30)" required>
                        <input
                          type="number"
                          min="0"
                          max="30"
                          className={inputClass}
                          value={testForm.subScores.listening || ''}
                          onChange={(e) =>
                            setTestForm({
                              ...testForm,
                              subScores: {
                                ...testForm.subScores,
                                listening: e.target.value,
                              },
                            })
                          }
                        />
                      </FormField>
                      <FormField label="Speaking (0-30)" required>
                        <input
                          type="number"
                          min="0"
                          max="30"
                          className={inputClass}
                          value={testForm.subScores.speaking || ''}
                          onChange={(e) =>
                            setTestForm({
                              ...testForm,
                              subScores: {
                                ...testForm.subScores,
                                speaking: e.target.value,
                              },
                            })
                          }
                        />
                      </FormField>
                      <FormField label="Writing (0-30)" required>
                        <input
                          type="number"
                          min="0"
                          max="30"
                          className={inputClass}
                          value={testForm.subScores.writing || ''}
                          onChange={(e) =>
                            setTestForm({
                              ...testForm,
                              subScores: {
                                ...testForm.subScores,
                                writing: e.target.value,
                              },
                            })
                          }
                        />
                      </FormField>
                    </div>
                  )}

                  {testForm.type === 'GRE' && (
                    <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                      <FormField label="Verbal (130-170)" required>
                        <input
                          type="number"
                          min="130"
                          max="170"
                          className={inputClass}
                          value={testForm.subScores.verbal || ''}
                          onChange={(e) =>
                            setTestForm({
                              ...testForm,
                              subScores: {
                                ...testForm.subScores,
                                verbal: e.target.value,
                              },
                            })
                          }
                        />
                      </FormField>
                      <FormField label="Quantitative (130-170)" required>
                        <input
                          type="number"
                          min="130"
                          max="170"
                          className={inputClass}
                          value={testForm.subScores.quantitative || ''}
                          onChange={(e) =>
                            setTestForm({
                              ...testForm,
                              subScores: {
                                ...testForm.subScores,
                                quantitative: e.target.value,
                              },
                            })
                          }
                        />
                      </FormField>
                      <FormField label="Analytical Writing (0-6)" required>
                        <input
                          type="number"
                          min="0"
                          max="6"
                          className={inputClass}
                          value={testForm.subScores.analyticalWriting || ''}
                          onChange={(e) =>
                            setTestForm({
                              ...testForm,
                              subScores: {
                                ...testForm.subScores,
                                analyticalWriting: e.target.value,
                              },
                            })
                          }
                        />
                      </FormField>
                    </div>
                  )}

                  <FormField label="Notes (Optional)" icon={AlignLeft}>
                    <textarea
                      rows="3"
                      className={inputClass}
                      value={testForm.notes}
                      onChange={(e) =>
                        setTestForm({ ...testForm, notes: e.target.value })
                      }
                    />
                  </FormField>

                  <div className="flex justify-end gap-2 pt-4">
                    <button
                      onClick={() => setShowTestModal(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (testForm.type && testForm.date && testForm.score) {
                          setTestScores([...testScores, { ...testForm }]);
                          setTestForm({
                            type: '',
                            date: '',
                            score: '',
                            subScores: {},
                            notes: '',
                          });
                          setShowTestModal(false);
                        }
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                    >
                      Save Test Score
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6 bg-white p-4 rounded-lg">
            <button
              onClick={() => setCurrentPage('study')}
              className="text-gray-700 font-semibold"
            >
              ← Back
            </button>
            <button
              onClick={() => setCurrentPage('work')}
              className="text-gray-700 font-semibold"
            >
              Next Form →
            </button>
          </div>
        </div>
      </main>
    );
  }

  function WorkExperiencePage() {
    return (
      <main className="flex-1 flex flex-col">
        <div className="bg-white border-b px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => setCurrentPage('test')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Work Experience</h1>
            <p className="text-sm text-gray-500">
              Jobs and extracurricular activities
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-2 gap-4 mb-6">
            <TabCard
              icon={Briefcase}
              title="Work Experience"
              subtitle="Jobs and roles"
              active={activeWorkTab === 'work'}
              onClick={() => setActiveWorkTab('work')}
              showWarning={workExperiences.length === 0}
            />
            <TabCard
              icon={Users}
              title="Other Activities"
              subtitle="Extracurriculars"
              active={activeWorkTab === 'activities'}
              onClick={() => setActiveWorkTab('activities')}
              showWarning={activities.length === 0}
            />
          </div>

          {activeWorkTab === 'work' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Work Experience</h3>
                <button
                  onClick={() => setShowWorkForm(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4" /> Add Experience
                </button>
              </div>

              {showWorkForm && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Add Work Experience</h4>
                      <p className="text-xs text-gray-500">
                        Please provide details about your work
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <FormField label="Experience Type" icon={Briefcase} required>
                      <select
                        className={inputClass}
                        value={workForm.type}
                        onChange={(e) =>
                          setWorkForm({ ...workForm, type: e.target.value })
                        }
                      >
                        <option value="">Select type</option>
                        <option>Full-time</option>
                        <option>Part-time</option>
                        <option>Internship</option>
                        <option>Freelance</option>
                        <option>Volunteer</option>
                        <option>Contract</option>
                        <option>Self-employed</option>
                      </select>
                    </FormField>
                    <FormField label="Company Name" icon={Building} required>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="Enter company name"
                        value={workForm.company}
                        onChange={(e) =>
                          setWorkForm({ ...workForm, company: e.target.value })
                        }
                      />
                    </FormField>
                    <FormField label="Role Title" icon={User} required>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="Enter job title"
                        value={workForm.role}
                        onChange={(e) =>
                          setWorkForm({ ...workForm, role: e.target.value })
                        }
                      />
                    </FormField>
                    <FormField label="Currency" icon={DollarSign} required>
                      <select
                        className={inputClass}
                        value={workForm.currency}
                        onChange={(e) =>
                          setWorkForm({ ...workForm, currency: e.target.value })
                        }
                      >
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                        <option>NPR</option>
                        <option>INR</option>
                        <option>Other</option>
                      </select>
                    </FormField>
                    <FormField label="Salary" icon={DollarSign} required>
                      <input
                        type="number"
                        className={inputClass}
                        placeholder="Enter salary amount"
                        value={workForm.salary}
                        onChange={(e) =>
                          setWorkForm({ ...workForm, salary: e.target.value })
                        }
                      />
                    </FormField>
                    <FormField label="Start Date" icon={Calendar} required>
                      <input
                        type="date"
                        className={inputClass}
                        value={workForm.startDate}
                        onChange={(e) =>
                          setWorkForm({ ...workForm, startDate: e.target.value })
                        }
                      />
                    </FormField>
                    <FormField label="End Date" icon={Calendar} required>
                      <input
                        type="date"
                        className={inputClass}
                        disabled={workForm.currentlyWorking}
                        value={workForm.endDate}
                        onChange={(e) =>
                          setWorkForm({ ...workForm, endDate: e.target.value })
                        }
                      />
                    </FormField>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        id="currently-working"
                        checked={workForm.currentlyWorking}
                        onChange={(e) =>
                          setWorkForm({
                            ...workForm,
                            currentlyWorking: e.target.checked,
                          })
                        }
                        className="rounded border-gray-300"
                      />
                      <label
                        htmlFor="currently-working"
                        className="text-sm text-gray-700"
                      >
                        Currently working here
                      </label>
                    </div>
                  </div>

                  <FormField
                    label="Responsibilities"
                    icon={FileText}
                    required
                  >
                    <textarea
                      rows="3"
                      className={inputClass}
                      placeholder="Describe your key responsibilities and duties"
                      value={workForm.responsibilities}
                      onChange={(e) =>
                        setWorkForm({
                          ...workForm,
                          responsibilities: e.target.value,
                        })
                      }
                    />
                  </FormField>

                  <FormField label="Skills Gained" icon={Star} required>
                    <textarea
                      rows="3"
                      className={inputClass}
                      placeholder="Describe the skills and experience gained"
                      value={workForm.skillsGained}
                      onChange={(e) =>
                        setWorkForm({
                          ...workForm,
                          skillsGained: e.target.value,
                        })
                      }
                    />
                  </FormField>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setShowWorkForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (
                          workForm.type &&
                          workForm.company &&
                          workForm.role &&
                          workForm.startDate
                        ) {
                          setWorkExperiences([...workExperiences, { ...workForm }]);
                          setWorkForm({
                            type: '',
                            company: '',
                            role: '',
                            currency: 'USD',
                            salary: '',
                            startDate: '',
                            endDate: '',
                            currentlyWorking: false,
                            responsibilities: '',
                            skillsGained: '',
                          });
                          setShowWorkForm(false);
                        }
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                    >
                      Add Experience
                    </button>
                  </div>
                </div>
              )}

              {workExperiences.length === 0 && !showWorkForm ? (
                <EmptyState
                  icon={Briefcase}
                  title="No Work Experience Added"
                  description="Add your work experience to complete this section"
                  buttonText="Add Experience"
                  onButtonClick={() => setShowWorkForm(true)}
                />
              ) : (
                workExperiences.map((work, idx) => (
                  <RecordCard
                    key={idx}
                    title={work.role}
                    subtitle={work.company}
                    meta={`${work.startDate} to ${work.endDate || 'Present'}`}
                    onDelete={() =>
                      setWorkExperiences(
                        workExperiences.filter((_, i) => i !== idx)
                      )
                    }
                  />
                ))
              )}
            </div>
          )}

          {activeWorkTab === 'activities' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  Extracurricular Activities
                </h3>
                <button
                  onClick={() => setShowActivityForm(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4" /> Add Activity
                </button>
              </div>

              {showActivityForm && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Add Extracurricular Activity
                      </h4>
                      <p className="text-xs text-gray-500">
                        Please provide details about your activities
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <FormField label="Activity Name" icon={Star} required>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="Enter activity name"
                        value={activityForm.name}
                        onChange={(e) =>
                          setActivityForm({
                            ...activityForm,
                            name: e.target.value,
                          })
                        }
                      />
                    </FormField>
                    <FormField label="Your Role" icon={User} required>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="Enter your role"
                        value={activityForm.role}
                        onChange={(e) =>
                          setActivityForm({
                            ...activityForm,
                            role: e.target.value,
                          })
                        }
                      />
                    </FormField>
                    <FormField label="Start Date" icon={Calendar} required>
                      <input
                        type="date"
                        className={inputClass}
                        value={activityForm.startDate}
                        onChange={(e) =>
                          setActivityForm({
                            ...activityForm,
                            startDate: e.target.value,
                          })
                        }
                      />
                    </FormField>
                    <FormField label="End Date" icon={Calendar} required>
                      <input
                        type="date"
                        className={inputClass}
                        disabled={activityForm.currentlyInvolved}
                        value={activityForm.endDate}
                        onChange={(e) =>
                          setActivityForm({
                            ...activityForm,
                            endDate: e.target.value,
                          })
                        }
                      />
                    </FormField>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <input
                      type="checkbox"
                      id="currently-involved"
                      checked={activityForm.currentlyInvolved}
                      onChange={(e) =>
                        setActivityForm({
                          ...activityForm,
                          currentlyInvolved: e.target.checked,
                        })
                      }
                      className="rounded border-gray-300"
                    />
                    <label htmlFor="currently-involved" className="text-sm text-gray-700">
                      Currently involved in this activity
                    </label>
                  </div>

                  <FormField label="Responsibilities" icon={FileText} required>
                    <textarea
                      rows="3"
                      className={inputClass}
                      placeholder="Describe your responsibilities and achievements"
                      value={activityForm.responsibilities}
                      onChange={(e) =>
                        setActivityForm({
                          ...activityForm,
                          responsibilities: e.target.value,
                        })
                      }
                    />
                  </FormField>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setShowActivityForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (
                          activityForm.name &&
                          activityForm.role &&
                          activityForm.startDate
                        ) {
                          setActivities([...activities, { ...activityForm }]);
                          setActivityForm({
                            name: '',
                            role: '',
                            startDate: '',
                            endDate: '',
                            currentlyInvolved: false,
                            responsibilities: '',
                          });
                          setShowActivityForm(false);
                        }
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                    >
                      Add Activity
                    </button>
                  </div>
                </div>
              )}

              {activities.length === 0 && !showActivityForm ? (
                <EmptyState
                  icon={Users}
                  title="No Activities Added"
                  description="Add your extracurricular activities to complete this section"
                  buttonText="Add Activity"
                  onButtonClick={() => setShowActivityForm(true)}
                />
              ) : (
                activities.map((activity, idx) => (
                  <RecordCard
                    key={idx}
                    title={activity.name}
                    subtitle={activity.role}
                    meta={`${activity.startDate} to ${activity.endDate || 'Present'}`}
                    onDelete={() =>
                      setActivities(activities.filter((_, i) => i !== idx))
                    }
                  />
                ))
              )}
            </div>
          )}

          <div className="flex justify-between mt-6 bg-white p-4 rounded-lg">
            <button
              onClick={() => setCurrentPage('test')}
              className="text-gray-700 font-semibold"
            >
              ← Back
            </button>
            <button
              onClick={() => setCurrentPage('financial')}
              className="text-gray-700 font-semibold"
            >
              Next Form →
            </button>
          </div>
        </div>
      </main>
    );
  }

  function FinancialPage() {
    return (
      <main className="flex-1 flex flex-col">
        <div className="bg-white border-b px-8 py-4 flex items-center gap-4">
          <button
            onClick={() => setCurrentPage('work')}
            className="text-gray-600 hover:text-gray-900"
          >
            ← Back
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Financial Details</h1>
            <p className="text-sm text-gray-500">
              Sponsors, assets, and scholarships
            </p>
          </div>
        </div>

        <div className="bg-gray-100 p-6 flex-1 overflow-y-auto">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <TabCard
              icon={DollarSign}
              title="Sponsors"
              subtitle="Financial supporters"
              active={activeFinancialTab === 'sponsors'}
              onClick={() => setActiveFinancialTab('sponsors')}
              showWarning={sponsors.length === 0}
            />
            <TabCard
              icon={Wallet}
              title="Financial Assets"
              subtitle="Bank accounts & assets"
              active={activeFinancialTab === 'assets'}
              onClick={() => setActiveFinancialTab('assets')}
              showWarning={assets.length === 0}
            />
            <TabCard
              icon={Gift}
              title="Scholarships & Grants"
              subtitle="Financial aid"
              active={activeFinancialTab === 'scholarships'}
              onClick={() => setActiveFinancialTab('scholarships')}
              showWarning={scholarships.length === 0}
            />
          </div>

          {activeFinancialTab === 'sponsors' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Sponsors</h3>
                <button
                  onClick={() => setShowSponsorForm(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4" /> Add Sponsor
                </button>
              </div>

              {showSponsorForm && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Add Sponsor</h4>
                      <p className="text-xs text-gray-500">
                        Please provide sponsor information
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <FormField label="Sponsor Name" icon={User} required>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="Enter sponsor name"
                        value={sponsorForm.name}
                        onChange={(e) =>
                          setSponsorForm({ ...sponsorForm, name: e.target.value })
                        }
                      />
                    </FormField>
                    <FormField label="Relationship" icon={Users} required>
                      <select
                        className={inputClass}
                        value={sponsorForm.relationship}
                        onChange={(e) =>
                          setSponsorForm({
                            ...sponsorForm,
                            relationship: e.target.value,
                          })
                        }
                      >
                        <option value="">Select relationship</option>
                        <option>Father</option>
                        <option>Mother</option>
                        <option>Self</option>
                        <option>Employer</option>
                        <option>Organization</option>
                        <option>Government</option>
                        <option>Other</option>
                      </select>
                    </FormField>
                    <FormField label="Sponsor Type" icon={Briefcase} required>
                      <select
                        className={inputClass}
                        value={sponsorForm.type}
                        onChange={(e) =>
                          setSponsorForm({ ...sponsorForm, type: e.target.value })
                        }
                      >
                        <option value="">Select type</option>
                        <option>Individual</option>
                        <option>Organization</option>
                        <option>Government</option>
                        <option>Scholarship</option>
                      </select>
                    </FormField>
                    <FormField label="Annual Income" icon={DollarSign} required>
                      <input
                        type="number"
                        className={inputClass}
                        placeholder="Enter annual income"
                        value={sponsorForm.income}
                        onChange={(e) =>
                          setSponsorForm({ ...sponsorForm, income: e.target.value })
                        }
                      />
                    </FormField>
                    <FormField label="Currency" icon={DollarSign} required>
                      <select
                        className={inputClass}
                        value={sponsorForm.currency}
                        onChange={(e) =>
                          setSponsorForm({
                            ...sponsorForm,
                            currency: e.target.value,
                          })
                        }
                      >
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                        <option>NPR</option>
                        <option>INR</option>
                      </select>
                    </FormField>
                    <FormField label="Phone" icon={Phone} required>
                      <input
                        type="tel"
                        className={inputClass}
                        value={sponsorForm.phone}
                        onChange={(e) =>
                          setSponsorForm({ ...sponsorForm, phone: e.target.value })
                        }
                      />
                    </FormField>
                    <FormField label="Email" icon={Mail}>
                      <input
                        type="email"
                        className={inputClass}
                        value={sponsorForm.email}
                        onChange={(e) =>
                          setSponsorForm({ ...sponsorForm, email: e.target.value })
                        }
                      />
                    </FormField>
                  </div>

                  <FormField label="Address" icon={MapPin}>
                    <textarea
                      rows="2"
                      className={inputClass}
                      value={sponsorForm.address}
                      onChange={(e) =>
                        setSponsorForm({ ...sponsorForm, address: e.target.value })
                      }
                    />
                  </FormField>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setShowSponsorForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (
                          sponsorForm.name &&
                          sponsorForm.relationship &&
                          sponsorForm.type &&
                          sponsorForm.income
                        ) {
                          setSponsors([...sponsors, { ...sponsorForm }]);
                          setSponsorForm({
                            name: '',
                            relationship: '',
                            type: '',
                            income: '',
                            currency: 'USD',
                            phone: '',
                            email: '',
                            address: '',
                          });
                          setShowSponsorForm(false);
                        }
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                    >
                      Add Sponsor
                    </button>
                  </div>
                </div>
              )}

              {sponsors.length === 0 && !showSponsorForm ? (
                <EmptyState
                  icon={DollarSign}
                  title="No Sponsors Added"
                  description="Add your sponsors to complete this section"
                  buttonText="Add Sponsor"
                  onButtonClick={() => setShowSponsorForm(true)}
                />
              ) : (
                sponsors.map((sponsor, idx) => (
                  <RecordCard
                    key={idx}
                    title={sponsor.name}
                    subtitle={sponsor.relationship}
                    meta={`${sponsor.type} • ${sponsor.currency} ${sponsor.income}`}
                    onDelete={() =>
                      setSponsors(sponsors.filter((_, i) => i !== idx))
                    }
                  />
                ))
              )}
            </div>
          )}

          {activeFinancialTab === 'assets' && (
            <div>
              {sponsors.length === 0 ? (
                <div className="bg-white rounded-xl p-6 mb-4">
                  <p className="text-sm text-orange-500 mb-4">
                    Add a sponsor first to enable financial assets.
                  </p>
                  <button
                    disabled
                    className="px-3 py-1.5 bg-gray-300 text-gray-400 rounded-lg text-sm font-semibold cursor-not-allowed"
                  >
                    <Plus className="w-4 h-4 inline mr-2" /> Add Asset
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-semibold text-gray-900">Financial Assets</h3>
                    <button
                      onClick={() => setShowAssetForm(true)}
                      className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                    >
                      <Plus className="w-4 h-4" /> Add Asset
                    </button>
                  </div>

                  {showAssetForm && (
                    <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                          <Wallet className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">Add Asset</h4>
                          <p className="text-xs text-gray-500">
                            Please provide asset details
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <FormField label="Asset Type" icon={Wallet} required>
                          <select
                            className={inputClass}
                            value={assetForm.type}
                            onChange={(e) =>
                              setAssetForm({ ...assetForm, type: e.target.value })
                            }
                          >
                            <option value="">Select asset type</option>
                            <option>Savings Account</option>
                            <option>Fixed Deposit</option>
                            <option>Real Estate</option>
                            <option>Vehicle</option>
                            <option>Business</option>
                            <option>Investment</option>
                            <option>Education Loan</option>
                            <option>Other</option>
                          </select>
                        </FormField>
                        <FormField label="Asset Name" icon={FileText} required>
                          <input
                            type="text"
                            className={inputClass}
                            placeholder="Enter asset name"
                            value={assetForm.name}
                            onChange={(e) =>
                              setAssetForm({ ...assetForm, name: e.target.value })
                            }
                          />
                        </FormField>
                        <FormField label="Value" icon={DollarSign} required>
                          <input
                            type="number"
                            className={inputClass}
                            placeholder="Enter asset value"
                            value={assetForm.value}
                            onChange={(e) =>
                              setAssetForm({ ...assetForm, value: e.target.value })
                            }
                          />
                        </FormField>
                        <FormField label="Currency" icon={DollarSign} required>
                          <select
                            className={inputClass}
                            value={assetForm.currency}
                            onChange={(e) =>
                              setAssetForm({
                                ...assetForm,
                                currency: e.target.value,
                              })
                            }
                          >
                            <option>USD</option>
                            <option>EUR</option>
                            <option>GBP</option>
                            <option>NPR</option>
                            <option>INR</option>
                          </select>
                        </FormField>
                        <FormField label="Linked Sponsor" icon={Users} required>
                          <select
                            className={inputClass}
                            value={assetForm.linkedSponsor}
                            onChange={(e) =>
                              setAssetForm({
                                ...assetForm,
                                linkedSponsor: e.target.value,
                              })
                            }
                          >
                            <option value="">Select sponsor</option>
                            {sponsors.map((sponsor, idx) => (
                              <option key={idx} value={sponsor.name}>
                                {sponsor.name}
                              </option>
                            ))}
                          </select>
                        </FormField>
                      </div>

                      <FormField label="Description" icon={AlignLeft}>
                        <textarea
                          rows="2"
                          className={inputClass}
                          placeholder="Provide details about this asset"
                          value={assetForm.description}
                          onChange={(e) =>
                            setAssetForm({
                              ...assetForm,
                              description: e.target.value,
                            })
                          }
                        />
                      </FormField>

                      <div className="flex justify-end gap-2 mt-4">
                        <button
                          onClick={() => setShowAssetForm(false)}
                          className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={() => {
                            if (
                              assetForm.type &&
                              assetForm.name &&
                              assetForm.value &&
                              assetForm.linkedSponsor
                            ) {
                              setAssets([...assets, { ...assetForm }]);
                              setAssetForm({
                                type: '',
                                name: '',
                                value: '',
                                currency: 'USD',
                                linkedSponsor: '',
                                description: '',
                              });
                              setShowAssetForm(false);
                            }
                          }}
                          className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                        >
                          Add Asset
                        </button>
                      </div>
                    </div>
                  )}

                  {assets.length === 0 && !showAssetForm ? (
                    <EmptyState
                      icon={Wallet}
                      title="No Financial Assets Added"
                      description="Add your financial assets to complete this section"
                      buttonText="Add Asset"
                      onButtonClick={() => setShowAssetForm(true)}
                    />
                  ) : (
                    assets.map((asset, idx) => (
                      <RecordCard
                        key={idx}
                        title={asset.name}
                        subtitle={asset.type}
                        meta={`${asset.currency} ${asset.value}`}
                        onDelete={() =>
                          setAssets(assets.filter((_, i) => i !== idx))
                        }
                      />
                    ))
                  )}
                </>
              )}
            </div>
          )}

          {activeFinancialTab === 'scholarships' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">
                  Scholarships & Grants
                </h3>
                <button
                  onClick={() => setShowScholarshipForm(true)}
                  className="flex items-center gap-2 px-3 py-1.5 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                >
                  <Plus className="w-4 h-4" /> Add Scholarship
                </button>
              </div>

              {showScholarshipForm && (
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-4">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
                      <Gift className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        Add Scholarship/Grant
                      </h4>
                      <p className="text-xs text-gray-500">
                        Please provide scholarship details
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <FormField label="Scholarship Name" icon={Award} required>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="Enter scholarship name"
                        value={scholarshipForm.name}
                        onChange={(e) =>
                          setScholarshipForm({
                            ...scholarshipForm,
                            name: e.target.value,
                          })
                        }
                      />
                    </FormField>
                    <FormField label="Provider" icon={Building} required>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="Enter scholarship provider"
                        value={scholarshipForm.provider}
                        onChange={(e) =>
                          setScholarshipForm({
                            ...scholarshipForm,
                            provider: e.target.value,
                          })
                        }
                      />
                    </FormField>
                    <FormField label="Type" icon={Gift} required>
                      <select
                        className={inputClass}
                        value={scholarshipForm.type}
                        onChange={(e) =>
                          setScholarshipForm({
                            ...scholarshipForm,
                            type: e.target.value,
                          })
                        }
                      >
                        <option value="">Select type</option>
                        <option>Merit-based</option>
                        <option>Need-based</option>
                        <option>Athletic</option>
                        <option>Governmental</option>
                        <option>Institutional</option>
                        <option>External</option>
                        <option>Other</option>
                      </select>
                    </FormField>
                    <FormField label="Amount" icon={DollarSign} required>
                      <input
                        type="number"
                        className={inputClass}
                        placeholder="Enter scholarship amount"
                        value={scholarshipForm.amount}
                        onChange={(e) =>
                          setScholarshipForm({
                            ...scholarshipForm,
                            amount: e.target.value,
                          })
                        }
                      />
                    </FormField>
                    <FormField label="Currency" icon={DollarSign} required>
                      <select
                        className={inputClass}
                        value={scholarshipForm.currency}
                        onChange={(e) =>
                          setScholarshipForm({
                            ...scholarshipForm,
                            currency: e.target.value,
                          })
                        }
                      >
                        <option>USD</option>
                        <option>EUR</option>
                        <option>GBP</option>
                        <option>NPR</option>
                        <option>INR</option>
                      </select>
                    </FormField>
                    <FormField label="Academic Year" icon={Calendar} required>
                      <input
                        type="text"
                        className={inputClass}
                        placeholder="e.g. 2024-2025"
                        value={scholarshipForm.academicYear}
                        onChange={(e) =>
                          setScholarshipForm({
                            ...scholarshipForm,
                            academicYear: e.target.value,
                          })
                        }
                      />
                    </FormField>
                    <FormField label="Status" icon={CheckCircle} required>
                      <select
                        className={inputClass}
                        value={scholarshipForm.status}
                        onChange={(e) =>
                          setScholarshipForm({
                            ...scholarshipForm,
                            status: e.target.value,
                          })
                        }
                      >
                        <option value="">Select status</option>
                        <option>Applied</option>
                        <option>Awarded</option>
                        <option>Pending</option>
                        <option>Rejected</option>
                      </select>
                    </FormField>
                  </div>

                  <FormField label="Description" icon={AlignLeft}>
                    <textarea
                      rows="2"
                      className={inputClass}
                      value={scholarshipForm.description}
                      onChange={(e) =>
                        setScholarshipForm({
                          ...scholarshipForm,
                          description: e.target.value,
                        })
                      }
                    />
                  </FormField>

                  <div className="flex justify-end gap-2 mt-4">
                    <button
                      onClick={() => setShowScholarshipForm(false)}
                      className="px-4 py-2 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => {
                        if (
                          scholarshipForm.name &&
                          scholarshipForm.provider &&
                          scholarshipForm.type &&
                          scholarshipForm.amount &&
                          scholarshipForm.academicYear &&
                          scholarshipForm.status
                        ) {
                          setScholarships([...scholarships, { ...scholarshipForm }]);
                          setScholarshipForm({
                            name: '',
                            provider: '',
                            type: '',
                            amount: '',
                            currency: 'USD',
                            academicYear: '',
                            status: '',
                            description: '',
                          });
                          setShowScholarshipForm(false);
                        }
                      }}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-semibold hover:bg-indigo-700"
                    >
                      Add Scholarship/Grant
                    </button>
                  </div>
                </div>
              )}

              {scholarships.length === 0 && !showScholarshipForm ? (
                <EmptyState
                  icon={Gift}
                  title="No Scholarships & Grants Added"
                  description="Add your scholarships and grants to complete this section"
                  buttonText="Add Scholarship"
                  onButtonClick={() => setShowScholarshipForm(true)}
                />
              ) : (
                scholarships.map((scholarship, idx) => (
                  <RecordCard
                    key={idx}
                    title={scholarship.name}
                    subtitle={scholarship.provider}
                    meta={`${scholarship.status} • ${scholarship.currency} ${scholarship.amount}`}
                    onDelete={() =>
                      setScholarships(scholarships.filter((_, i) => i !== idx))
                    }
                  />
                ))
              )}
            </div>
          )}

          <div className="flex justify-between mt-6 bg-white p-4 rounded-lg">
            <button
              onClick={() => setCurrentPage('work')}
              className="text-gray-700 font-semibold"
            >
              ← Back
            </button>
            <button
              onClick={() => setCurrentPage('overview')}
              className="text-gray-700 font-semibold"
            >
              Back to Overview
            </button>
          </div>
        </div>
      </main>
    );
  }

  // SIDEBAR
  return (
    <div className="h-screen w-screen flex font-sans bg-gray-100" style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&display=swap');`}</style>

      {/* Sidebar */}
      <div className="w-64 h-screen bg-white border-r border-gray-200 flex flex-col flex-shrink-0">
        {/* Logo */}
        <div className="p-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-xs font-bold">
              VP
            </div>
            <span className="font-bold text-gray-900">VisaProfile</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-3">
          {/* Learning Center Section */}
          <div className="mt-6 mb-2">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3">
              Learning Center
            </p>
            <div className="mt-2 space-y-1">
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
                <Database className="w-4 h-4" />
                Question Bank
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
                <FileText className="w-4 h-4" />
                Resources
              </div>
            </div>
          </div>

          {/* Account Section */}
          <div className="mt-6">
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-3 mb-2">
              Account
            </p>
            <div className="space-y-1">
              <div
                onClick={() => setCurrentPage('overview')}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm cursor-pointer transition-colors ${
                  currentPage === 'overview'
                    ? 'bg-indigo-50 text-indigo-600 font-medium'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <User className="w-4 h-4" />
                My Profile
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
                <CreditCard className="w-4 h-4" />
                Subscription
              </div>
              <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-gray-600 hover:bg-gray-50 cursor-pointer">
                <Settings className="w-4 h-4" />
                Settings
              </div>
            </div>
          </div>
        </nav>

        {/* Bottom Section */}
        <div className="p-4 mt-auto">
          {/* Free Plan Card */}
          <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span className="font-semibold text-sm text-gray-900">Free Plan</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              Upgrade to access more call credits & powerful features!
            </p>
            <button className="mt-3 w-full bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg py-2">
              Upgrade
            </button>
          </div>

          {/* User Row */}
          <div className="flex items-center gap-3 px-1">
            <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white text-xs font-semibold">
              RD
            </div>
            <span className="text-sm font-medium text-gray-900">Rejan Dhungana</span>
            <ChevronDown className="w-4 h-4 text-gray-400 ml-auto" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      {currentPage === 'overview' && <OverviewPage />}
      {currentPage === 'basic' && <BasicPage />}
      {currentPage === 'academic' && <AcademicPage />}
      {currentPage === 'study' && <StudyPage />}
      {currentPage === 'test' && <TestScoresPage />}
      {currentPage === 'work' && <WorkExperiencePage />}
      {currentPage === 'financial' && <FinancialPage />}
    </div>
  );
}
