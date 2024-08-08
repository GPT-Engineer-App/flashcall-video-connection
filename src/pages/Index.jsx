import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Phone, User, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const fetchUserProfile = async () => {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { name: 'John Doe', email: 'john@example.com', phone: '+1234567890' };
};

const fetchCallHistory = async () => {
  // Simulating an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return [
    { id: 1, number: '+1987654321', duration: '5:23', date: '2023-03-15' },
    { id: 2, number: '+1122334455', duration: '2:45', date: '2023-03-14' },
    { id: 3, number: '+1555666777', duration: '8:10', date: '2023-03-13' },
  ];
};

const Index = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const { data: userProfile, isLoading: isLoadingProfile, error: profileError } = useQuery({
    queryKey: ['userProfile'],
    queryFn: fetchUserProfile,
  });

  const { data: callHistory, isLoading: isLoadingHistory, error: historyError } = useQuery({
    queryKey: ['callHistory'],
    queryFn: fetchCallHistory,
  });

  const handleCall = () => {
    // Implement call functionality here
    console.log(`Calling ${phoneNumber}`);
  };

  return (
    <div className="min-h-screen p-8 bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-center">Phone App</h1>
      
      <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Make a Call</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex space-x-2">
              <Input
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              <Button onClick={handleCall}>
                <Phone className="mr-2 h-4 w-4" /> Call
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Profile</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingProfile ? (
              <p>Loading profile...</p>
            ) : profileError ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Failed to load user profile</AlertDescription>
              </Alert>
            ) : userProfile ? (
              <div>
                <p><User className="inline-block mr-2" /> {userProfile.name}</p>
                <p>{userProfile.email}</p>
                <p>{userProfile.phone}</p>
              </div>
            ) : null}
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Call History</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoadingHistory ? (
              <p>Loading call history...</p>
            ) : historyError ? (
              <Alert variant="destructive">
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>Failed to load call history</AlertDescription>
              </Alert>
            ) : callHistory ? (
              <ul className="space-y-2">
                {callHistory.map((call) => (
                  <li key={call.id} className="flex items-center justify-between">
                    <span>{call.number}</span>
                    <span><Clock className="inline-block mr-1" /> {call.duration}</span>
                    <span>{call.date}</span>
                  </li>
                ))}
              </ul>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
