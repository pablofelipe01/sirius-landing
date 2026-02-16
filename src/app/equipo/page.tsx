'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ScrollAnimation from '@/components/ScrollAnimation';

interface TeamMember {
  id: string | number;
  name: string;
  role: string;
  bio?: string;
  imageSrc?: string;
  status?: string;
}

interface ApiResponse {
  success: boolean;
  data?: Array<{
    id: string;
    name: string;
    role: string;
    status: string;
  }>;
  error?: string;
}

const TeamPage = () => {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch('/api/team-members', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          cache: 'no-store',
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.status}`);
        }

        const result: ApiResponse = await response.json();

        if (!result.success || !result.data) {
          setError('No pudimos cargar los miembros del equipo.');
          setTeamMembers([]);
          return;
        }

        const activeMembers = result.data;
        
        if (activeMembers && activeMembers.length > 0) {
          // Mapear la estructura de API a la estructura del componente
          const mappedMembers: TeamMember[] = activeMembers.map(member => ({
            id: member.id,
            name: member.name,
            role: member.role,
            status: member.status,
            // Usar un placeholder de imagen por defecto
            imageSrc: `/avatar-placeholder.png`,
          }));
          
          setTeamMembers(mappedMembers);
        } else {
          // No hay miembros activos - dejar vacío
          setTeamMembers([]);
        }
      } catch (err) {
        console.error('Error fetching team members:', err);
        setError('No pudimos cargar los miembros del equipo de la base de datos.');
        // No usar fallback - dejar vacío
        setTeamMembers([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  return (
    <main>
      <div className="bg-green-700 text-white py-20 px-4">
        <div className="container mx-auto text-center">
          <ScrollAnimation direction="up">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Nuestro Equipo</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Conoce a las personas detrás de Sirius Regenerative, unidas por la pasión
              de revolucionar la agricultura a través de soluciones regenerativas.
            </p>
          </ScrollAnimation>
        </div>
      </div>
      
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <ScrollAnimation direction="up">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold mb-4 text-gray-800">Un equipo con propósito</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                En Sirius Regenerative creemos que el trabajo en equipo, la pasión y el compromiso 
                son la base para crear soluciones que respeten y fortalezcan los ecosistemas.
              </p>
              {error && (
                <div className="mt-4 p-4 bg-yellow-100 border border-yellow-400 text-yellow-800 rounded-lg">
                  <p className="text-sm">{error}</p>
                </div>
              )}
              <p className="text-sm text-gray-500 mt-4">
                {teamMembers.length > 0 && `Mostrando ${teamMembers.length} miembros activos del equipo`}
              </p>
            </div>
          </ScrollAnimation>
          
          {isLoading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
              <p className="ml-4 text-gray-600">Cargando miembros del equipo...</p>
            </div>
          ) : teamMembers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">No hay miembros del equipo disponibles en este momento.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <ScrollAnimation 
                  key={member.id} 
                  direction="up" 
                  delay={0.1 * index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-transform duration-300 hover:-translate-y-2"
                >
                  <div className="relative h-80 bg-gray-200">
                    {member.imageSrc && member.imageSrc !== '/avatar-placeholder.png' ? (
                      <Image 
                        src={member.imageSrc} 
                        alt={member.name} 
                        fill
                        className="object-cover"
                        onError={(e) => {
                          // Manejo de error en la carga de imagen
                          const img = e.currentTarget as HTMLImageElement;
                          img.style.display = 'none';
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-green-100 to-green-200">
                        <div className="text-center">
                          <div className="text-5xl mb-2">👤</div>
                          <p className="text-green-700 font-medium">{member.name.charAt(0)}</p>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="p-6">
                    <h3 className="text-2xl font-bold mb-1 text-gray-800">{member.name}</h3>
                    <p className="text-green-600 font-medium mb-4">{member.role}</p>
                    <p className="text-gray-600 text-sm">
                      {member.bio || 'Miembro activo del equipo Sirius Regenerative'}
                    </p>
                  </div>
                </ScrollAnimation>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <ScrollAnimation direction="left">
              <div className="relative rounded-xl overflow-hidden shadow-xl h-96">
                <Image 
                  src="/foto10.png" 
                  alt="Equipo trabajando juntos" 
                  fill
                  className="object-cover"
                />
              </div>
            </ScrollAnimation>
            
            <ScrollAnimation direction="right">
              <h2 className="text-3xl font-bold mb-6 text-gray-800">
                🔥 Cuando el trabajo en equipo se llena de energía, todo es posible! ♻️
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                La creación de una planta de pirólisis no solo se trata de tecnología e innovación, 
                sino también de personas que trabajan con pasión y alegría.
              </p>
              <p className="text-lg text-gray-600 mb-6">
                💚 Aquí, cada sonrisa, cada esfuerzo y cada momento compartido hacen la diferencia. 
                Porque cuando disfrutamos lo que hacemos, trabajamos mejor y logramos grandes cosas juntos. 🚀
              </p>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-xl font-bold mb-2 text-gray-800">¿Quieres unirte a nuestro equipo?</h3>
                <p className="text-gray-600 mb-4">
                  Estamos siempre en búsqueda de talento apasionado por la regeneración y la sostenibilidad.
                </p>
                <a href="/contacto" className="inline-block bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg transition-colors">
                  Contacta con nosotros
                </a>
              </div>
            </ScrollAnimation>
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <ScrollAnimation direction="up">
            <h2 className="text-3xl font-bold mb-6">Nuestros valores</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <div className="bg-green-700/50 p-6 rounded-xl">
                <div className="text-4xl mb-4">🌱</div>
                <h3 className="text-xl font-bold mb-2">Regeneración</h3>
                <p className="text-white/80">
                  Creemos en devolver más de lo que tomamos, regenerando el suelo y los ecosistemas.
                </p>
              </div>
              
              <div className="bg-green-700/50 p-6 rounded-xl">
                <div className="text-4xl mb-4">🔬</div>
                <h3 className="text-xl font-bold mb-2">Innovación</h3>
                <p className="text-white/80">
                  Combinamos ciencia ancestral con tecnología de vanguardia para crear soluciones efectivas.
                </p>
              </div>
              
              <div className="bg-green-700/50 p-6 rounded-xl">
                <div className="text-4xl mb-4">💚</div>
                <h3 className="text-xl font-bold mb-2">Colaboración</h3>
                <p className="text-white/80">
                  Trabajamos juntos, con agricultores y con la naturaleza, para lograr un impacto positivo.
                </p>
              </div>
            </div>
          </ScrollAnimation>
        </div>
      </section>
    </main>
  );
};

export default TeamPage;