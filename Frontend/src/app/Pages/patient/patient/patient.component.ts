import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PatientService } from '../../../patient.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrl: './patient.component.css'
})
export class PatientComponent {
  displayedColumns: string[] = [
    'name',
    'age',
    'sex',
    'diseases',
    'medicines',
    'actions',
  ];
  patientForm: any;
  fetchedData: any;

  constructor(
    private fb: FormBuilder,
    private patientService: PatientService,
    private snackBar: MatSnackBar,
    private router:Router
  ) {
    this.patientForm = this.fb.group({
      patients: this.fb.array([this.createPatient()]),
    });
  }

  createPatient(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      sex: ['', Validators.required],
      diseases: this.fb.array([this.createDisease()]),
    });
  }

  createDisease(): FormGroup {
    return this.fb.group({
      diseaseName: ['', Validators.required],
      medicines: this.fb.array([this.createMedicine()]),
    });
  }

  createMedicine(): FormGroup {
    return this.fb.group({
      medicineName: [''],
    });
  }

  addPatient(): void {
    const patients = this.patientForm.get('patients') as FormArray;
    patients.push(this.createPatient());
  }

  addDisease(patientIndex: number): void {
    const diseases = (this.patientForm.get('patients') as FormArray)
      .at(patientIndex)
      .get('diseases') as FormArray;
    diseases.push(this.createDisease());
  }

  addMedicine(patientIndex: number, diseaseIndex: number): void {
    const medicines = (
      (this.patientForm.get('patients') as FormArray)
        .at(patientIndex)
        .get('diseases') as FormArray
    )
      .at(diseaseIndex)
      .get('medicines') as FormArray;
    medicines.push(this.createMedicine());
  }

  onSubmit() {
    if (this.patientForm.valid) {
      const patients = this.patientForm.value.patients;

      // Iterate over each patient in the patients array
      patients.forEach((patient: any) => {
        this.patientService.save(patient).subscribe(
          (response) => {
            console.log(response);
            this.patientForm.reset();
            this.snackBar.open(
              'Successfully submitted patient information!',
              'Close',
              {
                duration: 3000,
                verticalPosition: 'top',
              }
            );
          },
          (error) => {
            console.error(error);
            this.snackBar.open(
              'Failed to submitted patient information!',
              'Close',
              {
                duration: 3000,
                verticalPosition: 'top',
              }
            );
          }
        );
      });
    }
  }

  // update

  submitEditedData(patient: any) {
    // Call the service method to save patient data
    this.patientService.save(patient).subscribe(
      (response) => {
        console.log(response);
        this.snackBar.open(
          'Successfully updated patient information!',
          'Close',
          {
            duration: 3000,
            verticalPosition: 'top',
          }
        );
      },
      (error) => {
        console.error(error);
        this.snackBar.open('Failed to update patient information!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      }
    );
  }

  // fetch data

  fetchData() {
    this.patientService.getData().subscribe(
      (data) => {
        console.log(data);
        this.fetchedData = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  //edit data

  editRecord(record: any) {
    this.patientForm.patchValue({
      patients: [
        {
          name: record.name,
          age: record.age,
          sex: record.sex,
          diseases: record.diseases.map((disease: any) => ({
            diseaseName: disease.diseaseName,
            medicines: disease.medicines.map((medicine: any) => ({
              medicineName: medicine.medicineName,
            })),
          })),
        },
      ],
    });
  }

  //delete data
  deleteRecord(id: string): void {
    this.patientService.deleteRecord(id).subscribe({
      next: () => {
        console.log('PatientData deleted successfully!');
        this.snackBar.open('PatientData deleted successfully!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
        this.fetchData();
      },
      error: (err) => {
        console.log('Error:', err);
        this.snackBar.open('PatientData not deleted!', 'Close', {
          duration: 3000,
          verticalPosition: 'top',
        });
      },
    });
  }

  logout(): void {
    // Remove JWT token from localStorage
    localStorage.removeItem('token');
    console.log('User logged out');

    this.router.navigate(['/login']);
    // this.showSnackbarTopPosition('You have been logged out!', null, 3000);
    // alert('You have been logged out.');

    this.snackBar.open('You have been logged out!', 'Close', {
      duration: 3000,
      verticalPosition: 'top',
    });
  }

}
