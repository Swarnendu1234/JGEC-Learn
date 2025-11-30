import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null,
      errorInfo: null,
      errorCount: 0
    };
  }

  static getDerivedStateFromError(error) {
    console.error('🚨 Error caught by ErrorBoundary:', error);
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('❌ ErrorBoundary caught an error:');
    console.error('Error:', error);
    console.error('Error Info:', errorInfo);
    
    this.setState(prevState => ({
      error,
      errorInfo,
      errorCount: prevState.errorCount + 1
    }));
  }

  handleRetry = () => {
    console.log('🔄 Retrying...');
    this.setState({ 
      hasError: false, 
      error: null, 
      errorInfo: null 
    });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '40px 20px',
          minHeight: '100vh',
          backgroundColor: '#f8f9fa',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '30px',
            boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            textAlign: 'center'
          }}>
            <h2 style={{ 
              color: '#d32f2f', 
              marginBottom: '20px',
              fontSize: '24px'
            }}>
              ⚠️ Application Error
            </h2>
            
            <p style={{
              color: '#666',
              marginBottom: '20px',
              lineHeight: '1.6'
            }}>
              Something went wrong. This might be because:
            </p>

            <ul style={{
              textAlign: 'left',
              color: '#666',
              marginBottom: '20px',
              listStyle: 'none',
              padding: 0
            }}>
              <li style={{ marginBottom: '10px' }}>
                ❌ Backend server is not running (Make sure to run: <code style={{backgroundColor: '#f5f5f5', padding: '2px 6px', borderRadius: '3px'}}>node server.js</code>)
              </li>
              <li style={{ marginBottom: '10px' }}>
                ❌ Network/CORS issues between frontend and backend
              </li>
              <li>
                ❌ A JavaScript error in a component
              </li>
            </ul>

            <details style={{
              textAlign: 'left',
              marginBottom: '20px',
              backgroundColor: '#f5f5f5',
              padding: '10px',
              borderRadius: '4px'
            }}>
              <summary style={{ 
                cursor: 'pointer', 
                color: '#333',
                fontWeight: 'bold',
                userSelect: 'none'
              }}>
                📋 Error Details
              </summary>
              <pre style={{
                marginTop: '10px',
                padding: '10px',
                backgroundColor: '#fff',
                borderRadius: '4px',
                overflow: 'auto',
                fontSize: '12px',
                color: '#d32f2f',
                maxHeight: '200px'
              }}>
{this.state.error && this.state.error.toString()}
{this.state.errorInfo && '\n\n' + this.state.errorInfo.componentStack}
              </pre>
            </details>

            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
              <button
                onClick={this.handleRetry}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#4C57FF',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                🔄 Retry
              </button>
              <button
                onClick={() => window.location.href = '/'}
                style={{
                  padding: '10px 20px',
                  backgroundColor: '#666',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                🏠 Home
              </button>
            </div>

            <p style={{
              marginTop: '20px',
              fontSize: '12px',
              color: '#999'
            }}>
              Error Count: {this.state.errorCount}
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
