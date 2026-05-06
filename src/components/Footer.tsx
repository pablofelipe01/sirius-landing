export default function Footer() {
  return (
    <footer style={{ background: '#0E1814', padding: '64px 32px', borderTop: '1px solid rgba(241,233,218,0.08)' }}>
      <div style={{ maxWidth: 1320, margin: '0 auto' }}>
        <div style={{
          fontFamily: '"Museo Slab", Georgia, serif',
          fontSize: 'clamp(15px, 1.6vw, 18px)',
          fontWeight: 300, lineHeight: 1.7,
          color: 'rgba(241,233,218,0.72)',
          maxWidth: 680, marginBottom: 56,
          fontStyle: 'italic',
        }}>
          &ldquo;Ser una guía que brinda las herramientas para llevar el campo hacia
          la regeneración del suelo, de la biodiversidad y de los seres.&rdquo;
        </div>

        <div style={{ borderTop: '1px solid rgba(241,233,218,0.10)', paddingTop: 32, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
          <div style={{ fontSize: 12, color: 'rgba(241,233,218,0.40)', letterSpacing: '0.04em' }}>
            © Sirius Regenerative Solutions S.A.S ZOMAC · Barranca de Upía, Meta, Colombia
          </div>
        </div>
      </div>
    </footer>
  );
}
