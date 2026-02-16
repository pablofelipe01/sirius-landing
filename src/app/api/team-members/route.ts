import { getActiveTeamMembers } from '@/app/lib/airtable-service';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const teamMembers = await getActiveTeamMembers();
    
    return Response.json({
      success: true,
      data: teamMembers,
      count: teamMembers.length,
    });
  } catch (error) {
    console.error('Error in API route:', error);
    
    return Response.json(
      {
        success: false,
        error: 'Failed to fetch team members',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
