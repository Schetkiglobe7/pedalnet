from scipy.io import wavfile
import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import io
import base64
import numpy as np
from sklearn.metrics import mean_squared_error

from numpy import array, sign, zeros
from scipy.interpolate import interp1d
from past.builtins import xrange
from scipy.signal import hilbert, chirp


def getSoundWave(files):
	print(files)
	for file in files:
		# Load data from wav file
		sample_rate, data = wavfile.read('static/audio/{FILE}'.format(FILE = file))
		# Plot sound wave
		plt.plot(data[500:2500])

	plt.xlabel('Time')
	plt.ylabel('Amplitude')
	plt.title('Sound Wave')
	plt.legend(files)
	buf = io.BytesIO()
	plt.savefig(buf, format="png")
	plt.close()
	out = base64.b64encode(buf.getbuffer()).decode("ascii")
	return out


def getSpectrum(files):
	for file in files:
		sample_rate, data = wavfile.read('static/audio/{FILE}'.format(FILE = file))
		#FFT
		t = np.arange(data.shape[0])
		freq = np.fft.fftfreq(t.shape[-1])*sample_rate
		sp = np.fft.fft(data) 
		# Plot spectrum
		plt.plot(freq, abs(sp.real))
	plt.xlabel('Frequency (Hz)')
	plt.ylabel('Amplitude')
	plt.title('Spectrum')
	plt.xlim((0, 2000))
	plt.legend(files)
	buf = io.BytesIO()
	plt.savefig(buf, format="png")
	plt.close();
	out = base64.b64encode(buf.getbuffer()).decode("ascii")
	return out