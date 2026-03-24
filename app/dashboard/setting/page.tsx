'use client';

import { useState } from 'react';
import { Eye, EyeOff, Lock, LogOut, Trash2, Download, Check, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Select } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Label } from '@/components/ui/label';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { toast } from 'sonner';

const USA_SELF_LEARN_NAVBAR = () => (
  <nav className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        <div className="flex items-center gap-8">
          <div className="text-2xl font-bold text-primary">USA Self Learn</div>
          <div className="hidden md:flex items-center gap-6 text-sm">
            <a href="#" className="text-muted-foreground hover:text-foreground transition">Home</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">Dashboard</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">SOP Generator</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">SOP Review</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">Mock Interview</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">AI Tutor</a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition">Progress</a>
          </div>
        </div>
        <Button variant="ghost" size="sm">Sign Out</Button>
      </div>
    </div>
  </nav>
);

interface ProfileData {
  fullName: string;
  email: string;
  phone: string;
  countryOfOrigin: string;
  applyingToCountry: string;
  degreeLevel: string;
  fieldOfStudy: string;
  visaType: string;
  visaInterviewDate: string;
  gender: string;
  dateOfBirth: string;
}

interface SettingsData {
  emailNotifications: boolean;
  weeklyReport: boolean;
  language: string;
}

export default function SettingsProfile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [avatarInitials] = useState('JD');

  // Profile state
  const [profile, setProfile] = useState<ProfileData>({
    fullName: 'John Doe',
    email: 'john@example.com',
    phone: '+1 234 567 8900',
    countryOfOrigin: 'Nepal',
    applyingToCountry: 'USA',
    degreeLevel: 'Masters',
    fieldOfStudy: 'Computer Science',
    visaType: 'F-1',
    visaInterviewDate: '2025-06-15',
    gender: 'Male',
    dateOfBirth: '2000-05-20',
  });

  // Settings state
  const [settings, setSettings] = useState<SettingsData>({
    emailNotifications: true,
    weeklyReport: true,
    language: 'Hindi',
  });

  // Password state
  const [passwords, setPasswords] = useState({
    current: '',
    new: '',
    confirm: '',
  });

  // Stats
  const stats = [
    { label: 'SOPs Generated', value: '12', icon: '📄', color: 'bg-purple-500/20' },
    { label: 'SOP Reviews', value: '8', icon: '✓', color: 'bg-teal-500/20' },
    { label: 'Interviews Done', value: '15', icon: '🎤', color: 'bg-pink-500/20' },
    { label: 'Days Active', value: '45', icon: '📅', color: 'bg-green-500/20' },
  ];

  // Password strength checker
  const checkPasswordStrength = (password: string) => {
    const requirements = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*]/.test(password),
    };
    const met = Object.values(requirements).filter(Boolean).length;
    const strength = met === 0 ? 'Weak' : met <= 1 ? 'Weak' : met <= 2 ? 'Fair' : met <= 3 ? 'Strong' : 'Very Strong';
    return { requirements, met, strength };
  };

  const passwordCheck = checkPasswordStrength(passwords.new);
  const passwordsMatch = passwords.new === passwords.confirm && passwords.new.length > 0;
  const allRequirementsMet = Object.values(passwordCheck.requirements).every(Boolean);

  const handleProfileChange = (field: keyof ProfileData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleSettingsChange = (field: keyof SettingsData, value: string | boolean) => {
    setSettings(prev => ({ ...prev, [field]: value }));
  };

  const handleUpdateProfile = () => {
    toast.success('Profile updated successfully!');
  };

  const handleUpdatePassword = () => {
    if (!allRequirementsMet) {
      toast.error('Password does not meet all requirements');
      return;
    }
    if (!passwordsMatch) {
      toast.error('Passwords do not match');
      return;
    }
    toast.success('Password updated successfully!');
    setPasswords({ current: '', new: '', confirm: '' });
  };

  const handleExportData = () => {
    toast.success('Data export started. Check your email for the download link.');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you absolutely sure? This action cannot be undone.')) {
      toast.error('Account deletion initiated. You will be logged out.');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <USA_SELF_LEARN_NAVBAR />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Sidebar Navigation */}
          <div className="md:col-span-1">
            <div className="flex flex-col gap-2 md:gap-1 md:border-r md:border-border md:pr-6">
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-4 py-3 md:py-2 rounded-lg text-left transition-all ${
                  activeTab === 'profile'
                    ? 'bg-primary text-white md:bg-transparent md:text-primary md:border-l-2 md:border-primary md:pl-3'
                    : 'text-muted-foreground hover:text-foreground md:hover:bg-muted/50'
                }`}
              >
                Profile
              </button>
              <button
                onClick={() => setActiveTab('settings')}
                className={`px-4 py-3 md:py-2 rounded-lg text-left transition-all ${
                  activeTab === 'settings'
                    ? 'bg-primary text-white md:bg-transparent md:text-primary md:border-l-2 md:border-primary md:pl-3'
                    : 'text-muted-foreground hover:text-foreground md:hover:bg-muted/50'
                }`}
              >
                Settings
              </button>
              <button
                onClick={() => setActiveTab('password')}
                className={`px-4 py-3 md:py-2 rounded-lg text-left transition-all ${
                  activeTab === 'password'
                    ? 'bg-primary text-white md:bg-transparent md:text-primary md:border-l-2 md:border-primary md:pl-3'
                    : 'text-muted-foreground hover:text-foreground md:hover:bg-muted/50'
                }`}
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="md:col-span-4">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <h1 className="text-3xl font-bold">Profile</h1>
                  <p className="text-muted-foreground mt-1">Manage your personal information</p>
                </div>

                {/* Avatar Section */}
                <Card className="p-6 bg-card border-border">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center text-3xl font-bold text-white">
                        {avatarInitials}
                      </div>
                      <button className="absolute inset-0 rounded-full bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center text-white text-sm font-medium">
                        Edit Photo
                      </button>
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold">{profile.fullName}</h3>
                      <p className="text-muted-foreground">{profile.email}</p>
                    </div>
                  </div>
                </Card>

                {/* Form Fields */}
                <Card className="p-6 bg-card border-border space-y-6">
                  {/* Full Name & Email */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground mb-2 block">Full Name</Label>
                      <Input
                        value={profile.fullName}
                        onChange={(e) => handleProfileChange('fullName', e.target.value)}
                        className="bg-muted border-border"
                      />
                    </div>
                    <div>
                      <Label className="text-foreground mb-2 block">Email</Label>
                      <div className="relative">
                        <Input
                          value={profile.email}
                          disabled
                          className="bg-muted border-border pr-20"
                        />
                        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
                          Read-only
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <Label className="text-foreground mb-2 block">Phone Number</Label>
                    <Input
                      value={profile.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      className="bg-muted border-border"
                    />
                  </div>

                  {/* Dropdowns Row 1 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground mb-2 block">Country of Origin</Label>
                      <Select defaultValue={profile.countryOfOrigin}>
                        <option>Nepal</option>
                        <option>India</option>
                        <option>Bangladesh</option>
                        <option>Pakistan</option>
                        <option>Sri Lanka</option>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-foreground mb-2 block">Applying To Country</Label>
                      <Select defaultValue={profile.applyingToCountry}>
                        <option>USA</option>
                        <option>Canada</option>
                        <option>UK</option>
                        <option>Australia</option>
                      </Select>
                    </div>
                  </div>

                  {/* Dropdowns Row 2 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground mb-2 block">Degree Level</Label>
                      <Select defaultValue={profile.degreeLevel}>
                        <option>Bachelors</option>
                        <option>Masters</option>
                        <option>PhD</option>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-foreground mb-2 block">Field of Study</Label>
                      <Select defaultValue={profile.fieldOfStudy}>
                        <option>Computer Science</option>
                        <option>Engineering</option>
                        <option>Business</option>
                        <option>Data Science</option>
                      </Select>
                    </div>
                  </div>

                  {/* Dropdowns Row 3 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground mb-2 block">Visa Type</Label>
                      <Select defaultValue={profile.visaType}>
                        <option>F-1</option>
                        <option>J-1</option>
                        <option>H-1B</option>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-foreground mb-2 block">Planned Visa Interview Date</Label>
                      <Input
                        type="date"
                        value={profile.visaInterviewDate}
                        onChange={(e) => handleProfileChange('visaInterviewDate', e.target.value)}
                        className="bg-muted border-border"
                      />
                    </div>
                  </div>

                  {/* Dropdowns Row 4 */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label className="text-foreground mb-2 block">Gender</Label>
                      <Select defaultValue={profile.gender}>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Non-binary</option>
                        <option>Prefer not to say</option>
                      </Select>
                    </div>
                    <div>
                      <Label className="text-foreground mb-2 block">Date of Birth</Label>
                      <Input
                        type="date"
                        value={profile.dateOfBirth}
                        onChange={(e) => handleProfileChange('dateOfBirth', e.target.value)}
                        className="bg-muted border-border"
                      />
                    </div>
                  </div>

                  {/* Update Button */}
                  <Button
                    onClick={handleUpdateProfile}
                    className="w-full bg-primary hover:bg-primary/90 text-white"
                  >
                    Update Profile
                  </Button>
                </Card>
              </div>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <h1 className="text-3xl font-bold">Settings</h1>
                  <p className="text-muted-foreground mt-1">Manage your preferences</p>
                </div>

                {/* Statistics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {stats.map((stat, idx) => (
                    <Card key={idx} className="p-4 bg-card border-border">
                      <div className={`inline-block p-2 rounded-lg mb-3 ${stat.color}`}>
                        <span className="text-2xl">{stat.icon}</span>
                      </div>
                      <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                      <div className="text-sm text-muted-foreground">{stat.label}</div>
                    </Card>
                  ))}
                </div>

                {/* Preferences */}
                <Card className="p-6 bg-card border-border space-y-6">
                  <div className="border-b border-border pb-6">
                    <h3 className="text-lg font-semibold mb-2">Preferences</h3>
                  </div>

                  <div className="space-y-4">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition">
                      <div>
                        <p className="font-medium">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive updates about your SOP and interview progress</p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => handleSettingsChange('emailNotifications', checked)}
                      />
                    </div>

                    {/* Weekly Report */}
                    <div className="flex items-center justify-between p-4 rounded-lg hover:bg-muted/50 transition">
                      <div>
                        <p className="font-medium">Weekly Progress Report</p>
                        <p className="text-sm text-muted-foreground">Get a weekly summary of your learning progress</p>
                      </div>
                      <Switch
                        checked={settings.weeklyReport}
                        onCheckedChange={(checked) => handleSettingsChange('weeklyReport', checked)}
                      />
                    </div>

                    {/* Language Selector */}
                    <div className="p-4 rounded-lg hover:bg-muted/50 transition">
                      <Label className="text-foreground mb-2 block">Language</Label>
                      <Select
                        defaultValue={settings.language}
                        onChange={(e) => handleSettingsChange('language', e.currentTarget.value)}
                      >
                        <option>English</option>
                        <option>Hindi</option>
                        <option>Nepali</option>
                      </Select>
                    </div>
                  </div>
                </Card>

                {/* Danger Zone */}
                <Card className="p-6 bg-red-500/5 border border-red-500/20">
                  <h3 className="text-lg font-semibold text-red-500 mb-2 flex items-center gap-2">
                    <LogOut size={20} /> Danger Zone
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">These actions are irreversible</p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Button
                      variant="outline"
                      onClick={handleExportData}
                      className="border-border text-foreground hover:bg-muted flex-1"
                    >
                      <Download size={16} className="mr-2" /> Export My Data
                    </Button>
                    <Button
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700 text-white flex-1"
                    >
                      <Trash2 size={16} className="mr-2" /> Delete Account
                    </Button>
                  </div>
                </Card>
              </div>
            )}

            {/* Change Password Tab */}
            {activeTab === 'password' && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div>
                  <h1 className="text-3xl font-bold flex items-center gap-2">
                    <Lock size={32} className="text-primary" /> Change Password
                  </h1>
                  <p className="text-muted-foreground mt-1">Update your password to keep your account secure</p>
                </div>

                <Card className="p-6 bg-card border-border space-y-6">
                  {/* Current Password */}
                  <div>
                    <Label className="text-foreground mb-2 block">Current Password</Label>
                    <div className="relative">
                      <Input
                        type={showPassword ? 'text' : 'password'}
                        value={passwords.current}
                        onChange={(e) => setPasswords(prev => ({ ...prev, current: e.target.value }))}
                        className="bg-muted border-border pr-10"
                        placeholder="Enter your current password"
                      />
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* New Password */}
                  <div>
                    <Label className="text-foreground mb-2 block">New Password</Label>
                    <div className="relative">
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        value={passwords.new}
                        onChange={(e) => setPasswords(prev => ({ ...prev, new: e.target.value }))}
                        className="bg-muted border-border pr-10"
                        placeholder="Enter your new password"
                      />
                      <button
                        onClick={() => setShowNewPassword(!showNewPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password */}
                  <div>
                    <Label className="text-foreground mb-2 block">Confirm New Password</Label>
                    <div className="relative">
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        value={passwords.confirm}
                        onChange={(e) => setPasswords(prev => ({ ...prev, confirm: e.target.value }))}
                        className="bg-muted border-border pr-10"
                        placeholder="Confirm your new password"
                      />
                      <button
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Password Strength Indicator */}
                  {passwords.new && (
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">Password Strength</span>
                        <span className={`text-sm font-medium ${
                          passwordCheck.strength === 'Very Strong' ? 'text-green-500' :
                          passwordCheck.strength === 'Strong' ? 'text-yellow-500' :
                          passwordCheck.strength === 'Fair' ? 'text-orange-500' :
                          'text-red-500'
                        }`}>
                          {passwordCheck.strength}
                        </span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className={`h-full transition-all ${
                            passwordCheck.strength === 'Very Strong' ? 'w-full bg-green-500' :
                            passwordCheck.strength === 'Strong' ? 'w-3/4 bg-yellow-500' :
                            passwordCheck.strength === 'Fair' ? 'w-1/2 bg-orange-500' :
                            'w-1/4 bg-red-500'
                          }`}
                        />
                      </div>
                    </div>
                  )}

                  {/* Requirements Checklist */}
                  <div className="bg-muted/50 p-4 rounded-lg space-y-2">
                    <p className="text-sm font-medium text-foreground">Password Requirements</p>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2">
                        {passwordCheck.requirements.length ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <X size={16} className="text-muted-foreground" />
                        )}
                        <span className={passwordCheck.requirements.length ? 'text-green-500' : 'text-muted-foreground'}>
                          At least 8 characters
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordCheck.requirements.uppercase ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <X size={16} className="text-muted-foreground" />
                        )}
                        <span className={passwordCheck.requirements.uppercase ? 'text-green-500' : 'text-muted-foreground'}>
                          One uppercase letter
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordCheck.requirements.number ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <X size={16} className="text-muted-foreground" />
                        )}
                        <span className={passwordCheck.requirements.number ? 'text-green-500' : 'text-muted-foreground'}>
                          One number
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        {passwordCheck.requirements.special ? (
                          <Check size={16} className="text-green-500" />
                        ) : (
                          <X size={16} className="text-muted-foreground" />
                        )}
                        <span className={passwordCheck.requirements.special ? 'text-green-500' : 'text-muted-foreground'}>
                          One special character (!@#$%^&*)
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Update Button */}
                  <Button
                    onClick={handleUpdatePassword}
                    disabled={!allRequirementsMet || !passwordsMatch}
                    className="w-full bg-primary hover:bg-primary/90 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Update Password
                  </Button>
                </Card>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
