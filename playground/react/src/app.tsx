import licenses from 'virtual:oss-licenses';

export const App = () => {
  return (
    <div>
      <h1 className="font-bold text-3xl underline">Open Source Licenses</h1>
      <div>
        {licenses.map((license) => (
          <div key={license.name} className="my-2 border p-4">
            <h2 className="font-bold text-xl">{license.name}</h2>
            <p>Version: {license.version}</p>
            <p>Description: {license.description}</p>
            <p>License: {license.licenses.join(', ')}</p>
            {license.homepage && (
              <p>
                Homepage:{' '}
                <a href={license.homepage} target="_blank" rel="noopener noreferrer">
                  {license.homepage}
                </a>
              </p>
            )}
            {license.repository && (
              <p>
                Repository:{' '}
                <a href={license.repository} target="_blank" rel="noopener noreferrer">
                  {license.repository}
                </a>
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
