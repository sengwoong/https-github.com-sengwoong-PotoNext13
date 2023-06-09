import NewPost from '@/components/NewPost/NewPost';
import LoginPPage from '@/components/LoginInput/loginPPage';
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import { Metadata } from 'next';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'New Post',
  description: 'Create a new post',
};

export default async function NewCruPage() {
  return <LoginPPage />;
}
