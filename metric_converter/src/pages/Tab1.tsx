import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonLabel, IonSelect, IonSelectOption, IonInput, IonText, IonButton } from '@ionic/react';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null);
  const [fromUnit, setFromUnit] = useState<string | null>(null);
  const [toUnit, setToUnit] = useState<string | null>(null);
  const [inputValue, setInputValue] = useState<string | null>(null);
  const [result, setResult] = useState<string>('');

  const metrics = [
    { name: 'Panjang', units: ['Meter', 'Centimeter', 'Kilometer'] },
    { name: 'Berat', units: ['Kilogram', 'Gram', 'Ton'] },
    { name: 'Suhu', units: ['Celsius', 'Fahrenheit', 'Kelvin'] },
  ];

  const handleMetricChange = (value: string | null) => {
    setSelectedMetric(value);
    setFromUnit(null);
    setToUnit(null);
    setResult('');
  };

  const handleConversion = () => {
    if (selectedMetric && fromUnit && toUnit && inputValue) {
      const value = parseFloat(inputValue);
      if (isNaN(value)) {
        setResult('Input harus berupa angka');
        return;
      }

      let conversionResult = 'Konversi tidak tersedia';

      if (selectedMetric === 'Panjang') {
        if (fromUnit === 'Meter' && toUnit === 'Centimeter') {
          conversionResult = (value * 100).toString();
        } else if (fromUnit === 'Centimeter' && toUnit === 'Meter') {
          conversionResult = (value / 100).toString();
        }
      }
      setResult(conversionResult);
    }
  };

  const availableUnits = selectedMetric
    ? metrics.find(metric => metric.name === selectedMetric)?.units || []
    : [];

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Metric Converter</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2>By : Marsel Marhaen Wungow</h2>

        <IonItem>
          <IonLabel>Dari:</IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel position="floating"></IonLabel>
          <IonSelect value={selectedMetric} placeholder="Pilih Metrik" onIonChange={e => handleMetricChange(e.detail.value)}>
            {metrics.map(metric => (
              <IonSelectOption key={metric.name} value={metric.name}>
                {metric.name}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel>Ke:</IonLabel>
        </IonItem>

        <IonItem>
          <IonLabel position="floating"></IonLabel>
          <IonSelect value={fromUnit} placeholder="Pilih Satuan" onIonChange={e => setFromUnit(e.detail.value)} disabled={!selectedMetric}>
            {availableUnits.map(unit => (
              <IonSelectOption key={unit} value={unit}>
                {unit}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonLabel position="floating"></IonLabel>
          <IonSelect value={toUnit} placeholder="Pilih Satuan" onIonChange={e => setToUnit(e.detail.value)} disabled={!selectedMetric}>
            {availableUnits.map(unit => (
              <IonSelectOption key={unit} value={unit}>
                {unit}
              </IonSelectOption>
            ))}
          </IonSelect>
        </IonItem>

        <IonItem>
          <IonInput
            placeholder="Masukkan nilai"
            type="number"
            value={inputValue}
            onIonChange={e => setInputValue(e.detail.value!)}
          ></IonInput>
        </IonItem>

        <IonItem className="centered-button">
          <IonButton expand="full" onClick={handleConversion}>Konversi</IonButton>
        </IonItem>

        <IonItem>
          <IonText>Hasil: {result}</IonText>
        </IonItem>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
